export const declOfNum = (num: number, words: [string, string, string]): string => {
  const n = Math.floor(Math.abs(num));
  const lastDigit = n % 10;
  const lastTwoDigits = n % 100;

  // Для чисел 11-19 всегда используется множественное число (индекс 2)
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return words[2];
  }
  // Для чисел, оканчивающихся на 1 (кроме 11) – именительный падеж (индекс 0)
  if (lastDigit === 1) {
    return words[0];
  }
  // Для чисел 2,3,4 (кроме 12-14) – родительный падеж единственного числа (индекс 1)
  if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1];
  }
  // Во всех остальных случаях – родительный падеж множественного числа (индекс 2)
  return words[2];
};

const decorateDeclOfNum = (words: [string, string, string]) => (num: number) => declOfNum(num, words);

export const declOfNumDictionary = {
  ['балл' as const]: decorateDeclOfNum(['балл', 'балла', 'баллов']),
  ['блок' as const]: decorateDeclOfNum(['блок', 'блока', 'блоков']),
  ['бонус' as const]: decorateDeclOfNum(['бонус', 'бонуса', 'бонусов']),
  ['год' as const]: decorateDeclOfNum(['год', 'года', 'лет']),
  ['действие' as const]: decorateDeclOfNum(['действие', 'действия', 'действий']),
  ['день' as const]: decorateDeclOfNum(['день', 'дня', 'дней']),
  ['диалог' as const]: decorateDeclOfNum(['диалог', 'диалога', 'диалогов']),
  ['достижение' as const]: decorateDeclOfNum(['достижение', 'достижения', 'достижений']),
  ['звезда' as const]: decorateDeclOfNum(['звезда', 'звезды', 'звёзд']),
  ['игрок' as const]: decorateDeclOfNum(['игрок', 'игрока', 'игроков']),
  ['клетка' as const]: decorateDeclOfNum(['клетка', 'клетки', 'клеток']),
  ['клик' as const]: decorateDeclOfNum(['клик', 'клика', 'кликов']),
  ['кнопка' as const]: decorateDeclOfNum(['кнопка', 'кнопки', 'кнопок']),
  ['кристалл' as const]: decorateDeclOfNum(['кристалл', 'кристалла', 'кристаллов']),
  ['линия' as const]: decorateDeclOfNum(['линия', 'линии', 'линий']),
  ['меню' as const]: decorateDeclOfNum(['меню', 'меню', 'меню']),
  ['месяц' as const]: decorateDeclOfNum(['месяц', 'месяца', 'месяцев']),
  ['минута' as const]: decorateDeclOfNum(['минута', 'минуты', 'минут']),
  ['монета' as const]: decorateDeclOfNum(['монета', 'монеты', 'монет']),
  ['награда' as const]: decorateDeclOfNum(['награда', 'награды', 'наград']),
  ['настройка' as const]: decorateDeclOfNum(['настройка', 'настройки', 'настроек']),
  ['неделя' as const]: decorateDeclOfNum(['неделя', 'недели', 'недель']),
  ['очко' as const]: decorateDeclOfNum(['очко', 'очка', 'очков']),
  ['ошибка' as const]: decorateDeclOfNum(['ошибка', 'ошибки', 'ошибок']),
  ['пиксель' as const]: decorateDeclOfNum(['пиксель', 'пикселя', 'пикселей']),
  ['победа' as const]: decorateDeclOfNum(['победа', 'победы', 'побед']),
  ['подсказка' as const]: decorateDeclOfNum(['подсказка', 'подсказки', 'подсказок']),
  ['пользователь' as const]: decorateDeclOfNum(['пользователь', 'пользователя', 'пользователей']),
  ['попытка' as const]: decorateDeclOfNum(['попытка', 'попытки', 'попыток']),
  ['поражение' as const]: decorateDeclOfNum(['поражение', 'поражения', 'поражений']),
  ['предупреждение' as const]: decorateDeclOfNum(['предупреждение', 'предупреждения', 'предупреждений']),
  ['разработчик' as const]: decorateDeclOfNum(['разработчик', 'разработчика', 'разработчиков']),
  ['секунда' as const]: decorateDeclOfNum(['секунда', 'секунды', 'секунд']),
  ['тап' as const]: decorateDeclOfNum(['тап', 'тапа', 'тапов']),
  ['тема' as const]: decorateDeclOfNum(['тема', 'темы', 'тем']),
  ['уведомление' as const]: decorateDeclOfNum(['уведомление', 'уведомления', 'уведомлений']),
  ['уровень_род' as const]: decorateDeclOfNum(['уровня', 'уровней', 'уровней']),
  ['уровень' as const]: decorateDeclOfNum(['уровень', 'уровня', 'уровней']),
  ['цвет' as const]: decorateDeclOfNum(['цвет', 'цвета', 'цветов']),
  ['час' as const]: decorateDeclOfNum(['час', 'часа', 'часов']),
  ['шрифт' as const]: decorateDeclOfNum(['шрифт', 'шрифта', 'шрифтов']),
  ['элемент' as const]: decorateDeclOfNum(['элемент', 'элемента', 'элементов']),
  ['язык' as const]: decorateDeclOfNum(['язык', 'языка', 'языков']),
  ['ячейка' as const]: decorateDeclOfNum(['ячейка', 'ячейки', 'ячеек']),
} satisfies Record<string, (num: number) => string>;
