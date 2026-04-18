import z from 'zod';

import type { D } from '@nono-art/domain';

import { createZod } from '../utils.js';

/* ---------------------------------- login --------------------------------- */

export const login = createZod<D.User.Login>()(
  z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1, { message: 'не может быть пустым' }))
    .transform((val) => val.replace(/\s+/g, ' '))
    .pipe(z.string().max(100, { message: 'не может быть длиннее 100 символов' })),
);

export type Login = z.infer<typeof login>;

/* --------------------------------- / login -------------------------------- */

/* -------------------------------- password -------------------------------- */

export const password = createZod<D.User.Password>()(
  z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().min(1, { message: 'не может быть пустым' }))
    .transform((val) => val.replace(/\s+/g, ' '))
    .pipe(z.string().max(100, { message: 'не может быть длиннее 100 символов' })),
);

export type Password = z.infer<typeof password>;

/* ------------------------------- / password ------------------------------- */
