export const isObjectLike = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

/* -------------------------------------------------------------------------- */

/**
 * Проверяет, является ли значение допустимым ключом или значением enum-а.
 * @param enumObject - Объект enum (например, HttpStatus)
 * @param value - Проверяемое значение (строка или число)
 * @returns true, если значение принадлежит enum
 */
export const isEnumValue = <T extends Record<string, string | number>>(
  enumObject: T,
  value: unknown,
): value is T[keyof T] => {
  if (typeof value === 'string') {
    // Для строкового enum: ключи совпадают со значениями
    return Object.values(enumObject).includes(value);
  }
  if (typeof value === 'number') {
    // Для числового enum: значения — это числа, ключи — строки
    const enumValues = Object.values(enumObject).filter((v) => typeof v === 'number') as number[];
    return enumValues.includes(value);
  }
  return false;
};

/* -------------------------------------------------------------------------- */

/**
 * Утверждает, что значение принадлежит enum. Если нет — выбрасывает ошибку.
 * @throws {Error} Если значение не является частью enum
 */
export const assertEnumValue = <T extends Record<string, string | number>>(
  enumObject: T,
  value: unknown,
  enumName = 'Enum',
): asserts value is T[keyof T] => {
  if (!isEnumValue(enumObject, value)) {
    throw new Error(`Expected value to be a member of ${enumName}, but got ${String(value)} (type ${typeof value})`);
  }
};

/* -------------------------------------------------------------------------- */

export const isEnumValueStrict = <T extends Record<string, string | number>>(
  enumObject: T,
  value: unknown,
): value is T[keyof T] => {
  // Получаем все значения enum (и ключи-строки, и числовые значения)
  const enumValues = new Set(Object.values(enumObject));
  // Для числовых enum нам нужны только числовые значения, но Object.values возвращает и ключи-строки
  // Оставляем только значения того же типа, что и value
  if (typeof value === 'number') {
    // Для чисел проверяем наличие в Set, и дополнительно убеждаемся, что это не ключ-строка (который стал числом при парсинге)
    return enumValues.has(value) && typeof value === 'number';
  }
  if (typeof value === 'string') {
    return enumValues.has(value) && typeof value === 'string';
  }
  return false;
};

/* -------------------------------------------------------------------------- */

export const getEnumValues = <T extends Record<string, string | number>>(enumObject: T): ReadonlyArray<T[keyof T]> => {
  const keys: ReadonlyArray<keyof T> = Object.keys(enumObject);
  // Для числовых enum ключи включают и обратные маппинги (числа -> строки),
  // поэтому фильтруем ключи, которые являются строками-ключами, а не числами.
  const valueKeys = keys.filter((key) => isNaN(Number(key)));
  return valueKeys.map((key) => enumObject[key]);
};
