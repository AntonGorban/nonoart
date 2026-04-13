import { NextFunction, Request, Response } from 'express';

import { uuidV4 } from '@nono-art/utils';

import { context } from '../services';

// import { context } from '../utils/context';

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Берём requestId из заголовка X-Request-Id, иначе генерируем новый
  const requestId = (req.headers['x-request-id'] as string) || uuidV4();

  // Засекаем время начала запроса
  const startTime = Date.now();

  // Запускаем контекст для текущего запроса
  context.run({ requestId, startTime }, () => {
    // Добавляем requestId в заголовок ответа
    res.setHeader('X-Request-Id', requestId);

    // Логируем время окончания запроса при завершении
    res.on('finish', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const duration = Date.now() - startTime;
      // Сохраняем длительность в контекст или просто используем позже в morgan
      // Но morgan уже умеет сам замерять время, если использовать :response-time
      // Мы добавим длительность в отдельный лог через Winston позже (опционально)
    });

    next();
  });
};
