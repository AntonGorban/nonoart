/* eslint-disable @typescript-eslint/no-explicit-any */

export type ObjectWithGivenValues<O extends { [key: string]: any }, T> = {
  [key in keyof O]: T;
};

// export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type ProtoExtends<T extends { [key: string]: any }, U extends { [key: string]: any }> = U & Omit<T, keyof U>;

export type Pagination<T> = { readonly count: number; readonly rows: ReadonlyArray<T> };

export type Paginated<T> = { readonly count: number; readonly rows: T };

// export type Writable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWritable<T> = T extends object ? { -readonly [K in keyof T]: DeepWritable<T[K]> } : T;

// export type PropsType<T> = T extends (...props: infer U) => any ? U : never;

export type ComponentPropsType<T extends (props: any) => any> = Parameters<T>[0];

export type NonNullableFields<T> = { [P in keyof T]: NonNullable<T[P]> };
