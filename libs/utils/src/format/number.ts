// export const formatNumber = (num: number): string => {
//   const isPositive = num >= 0;

//   const content =
//     String(num)
//       .replace(/[^\d]/gim, '')
//       .split('')
//       .reverse()
//       .join('')
//       .match(/.{1,3}/g)
//       ?.join('\u00A0')
//       .split('')
//       .reverse()
//       .join('') || '0';

//   if (isPositive) return content;
//   else return `-\u00A0${content}`;
// };

/**
 * Форматирует число, добавляя разделители тысяч в целую часть.
 * @param num - число для форматирования
 * @param thousandSeparator - разделитель разрядов (по умолчанию неразрывный пробел)
 * @returns отформатированная строка
 *
 * @example
 * formatNumber(1234567.89)                    // "1{\u00A0}234{\u00A0}567.89"
 * formatNumber(-9876543.21, ' ')              // "- 9 876 543.21"
 * formatNumber(1000000, ',')                  // "1,000,000"
 */
export const formatNumber = (num: number, thousandSeparator: string = '\u00A0'): string => {
  // Обработка нечисловых значений
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return String(num);
  }

  const isNegative = num < 0;
  const absValue = Math.abs(num);
  const [integerPart = '0', fractionalPart] = absValue.toString().split('.');

  // Форматируем целую часть: группируем справа налево по 3 цифры
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  // Собираем результат
  let result = formattedInteger;
  if (fractionalPart !== undefined) {
    result += `.${fractionalPart}`;
  }

  return isNegative ? `-${thousandSeparator}${result}` : result;
};
