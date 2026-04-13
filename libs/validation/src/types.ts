export type DeepWritable<T> = { -readonly [P in keyof T]: T[P] };

export type IsEmptyObject<T> = [keyof T] extends [never] ? ({} extends T ? true : false) : false;

export type AssertExact<T, U> =
  IsEmptyObject<DeepWritable<T>> extends true
    ? IsEmptyObject<DeepWritable<U>> extends true
      ? true
      : false
    : [DeepWritable<T>] extends [DeepWritable<U>]
      ? [DeepWritable<U>] extends [DeepWritable<T>]
        ? true
        : false
      : false;
