import z from 'zod';

import type { D } from '@nono-art/domain';

import { createZod } from '../utils.js';

/* ---------------------------------- name ---------------------------------- */

export const name = createZod<D.Level.Name>()(
  z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1, { message: 'не может быть пустым' }))
    .transform((val) => val.replace(/\s+/g, ' '))
    .pipe(z.string().max(100, { message: 'не может быть длиннее 100 символов' })),
);

export type Name = z.infer<typeof name>;

/* --------------------------------- / name --------------------------------- */

/* ------------------------------- description ------------------------------ */

export const description = createZod<D.Level.Description>()(
  z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1, { message: 'не может быть пустым' }))
    .transform((val) => val.replace(/\s+/g, ' '))
    .pipe(z.string().max(500, { message: 'не может быть длиннее 500 символов' })),
);

export type Description = z.infer<typeof description>;

/* ------------------------------ / description ----------------------------- */

/* ---------------------------------- color --------------------------------- */

export const color = createZod<D.Level.Color>()(
  z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1, { message: 'Цвет не может быть пустым' }))
    .transform((val) => val.toUpperCase())
    .pipe(z.string().regex(/^#[0-9A-F]{6}$/, { message: 'Цвет должен быть в формате #RRGGBB (HEX)' }))
    .readonly(),
);

export type Color = z.infer<typeof color>;

/* --------------------------------- / color -------------------------------- */

/* --------------------------------- colors --------------------------------- */

export const colors = createZod<D.Level.Colors>()(z.tuple([color, color, color]).readonly());

export type Colors = z.infer<typeof colors>;

/* -------------------------------- / colors -------------------------------- */

/* ---------------------------------- cell ---------------------------------- */

export const cell = createZod<D.Level.Cell>()(
  z
    .union([z.literal(0), z.literal(1), z.literal(2), z.null()], 'должно быть 0, 1, 2 или null')
    .readonly()
    .refine((val) => val !== undefined, {
      message: 'должно быть 0, 1, 2 или null',
    }),
);

export type Cell = z.infer<typeof cell>;

/* --------------------------------- / cell --------------------------------- */

/* ---------------------------------- grid ---------------------------------- */

export const grid = createZod<D.Level.Grid>()(
  z
    .array(
      z
        .array(cell)
        .readonly()
        .refine((row) => row.length > 0, {
          message: 'Строка сетки не может быть пустой',
        }),
    )
    .readonly()
    .refine((grid) => grid.length > 0, { message: 'Сетка не может быть пустой' }),
);

export type Grid = z.infer<typeof grid>;

/* --------------------------------- / grid --------------------------------- */
