import type express from 'express';

import { context, logger } from '../../services';

/**
 * Оборачивает один обработчик (middleware/контроллер) в функцию,
 * которая логирует вход, выход и время выполнения.
 * Обработчики ошибок (4 параметра) пропускаются без изменений.
 */
function wrapHandler(handler: express.RequestHandler, name: string): express.RequestHandler {
  // Пропускаем обработчики ошибок – они имеют 4 параметра
  if (handler.length === 4) {
    return handler;
  }

  return (req, res, next) => {
    const requestId = context.getStore()?.requestId;
    const start = Date.now();

    logger.trace(`--> ${name} started | reqId:${requestId}`);

    const wrappedNext: express.NextFunction = (err?: any) => {
      const duration = Date.now() - start;
      logger.trace(`<-- ${name} finished in ${duration}ms | reqId:${requestId}`);

      next(err);
    };

    try {
      const result = handler(req, res, wrappedNext);
      // Если обработчик вернул Promise, перехватываем возможные ошибки из него
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (result && typeof result.catch === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result.catch((error: any) => {
          wrappedNext(error);
        });
      }
    } catch (error) {
      wrappedNext(error);
    }
  };
}

/**
 * Рекурсивно оборачивает все элементы, которые могут быть переданы в app.use:
 * - одиночный обработчик
 * - массив обработчиков
 * - Router
 */
function wrapUseArgument(arg: any, defaultName: string): any {
  if (typeof arg === 'function') {
    // Обработчик
    const name = arg.name || defaultName;
    return wrapHandler(arg, name);
  }

  if (Array.isArray(arg)) {
    // Массив обработчиков
    return arg.map((item, index) => wrapUseArgument(item, `${defaultName}[${index}]`));
  }

  if (arg && typeof arg === 'object' && 'use' in arg && typeof arg.use === 'function') {
    // Это Router – патчим его use рекурсивно
    enableRouterTracing(arg);
    return arg;
  }

  return arg;
}

/**
 * Патчит метод use у Router'а (в том числе у основного app)
 */
function enableRouterTracing(router: express.Router | express.Application) {
  const originalUse = router.use;

  router.use = function (...args: any[]) {
    // Пытаемся получить осмысленное имя из первого аргумента, если это строка (путь)
    const path = typeof args[0] === 'string' ? args[0] : '/';
    const defaultName = `[${path}]`;

    // Оборачиваем все переданные аргументы, кроме первого, если он строка (путь)
    const wrappedArgs = args.map((arg, index) => {
      if (index === 0 && typeof arg === 'string') {
        return arg; // путь не оборачиваем
      }
      return wrapUseArgument(arg, `${defaultName}#${index}`);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return originalUse.apply(this, wrappedArgs);
  } as any;
}

/**
 * Включает трассировку всех middleware и контроллеров для приложения Express.
 * Вызовите эту функцию сразу после создания app.
 */
export function enableMiddlewareTracing(app: express.Application) {
  enableRouterTracing(app);
}
