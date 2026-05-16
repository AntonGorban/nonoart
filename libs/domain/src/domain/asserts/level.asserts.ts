import { isEnumValueStrict } from '@nono-art/utils';

import { Level } from '../Level.domain';
import type { User } from '../User.domain';

/* -------------------------------------------------------------------------- */

export const id = (value: unknown): value is Level.Id => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const name = (value: unknown): value is Level.Name => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const description = (value: unknown): value is Level.Description => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const color = (value: unknown): value is Level.Color => {
  return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value);
};

/* -------------------------------------------------------------------------- */

export const colors = (value: unknown): value is Level.Colors =>
  Array.isArray(value) && value.length === 3 && color(value[0]) && color(value[1]) && color(value[2]);

/* -------------------------------------------------------------------------- */

export const cell = (value: unknown): value is Level.Cell =>
  value === null || (typeof value === 'number' && [0, 1, 2].includes(value));

/* -------------------------------------------------------------------------- */

export const gridRow = (value: unknown): value is Level.GridRow =>
  Array.isArray(value) && value.length !== 0 && value.every(cell);

/* -------------------------------------------------------------------------- */

export const grid = (value: unknown): value is Level.Grid => {
  if (!value) return false;
  if (!Array.isArray(value)) return false;
  if (value.length === 0) return false;
  if (!value.every(gridRow)) return false;
  const width = value[0]?.length;
  if (!value.every((row) => row.length === width)) return false;
  return true;
};

/* -------------------------------------------------------------------------- */

export const authorId = (value: unknown): value is Level.AuthorID => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const authorName = (value: unknown): value is User.Login => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const status = (value: unknown): value is Level.Status => isEnumValueStrict(Level.Status, value);

/* -------------------------------------------------------------------------- */

export const likesCount = (value: unknown): value is Level.LikesCount => typeof value === 'number' && value >= 0;

/* -------------------------------------------------------------------------- */

export const dislikesCount = (value: unknown): value is Level.DislikesCount => typeof value === 'number' && value >= 0;

/* -------------------------------------------------------------------------- */

export const serializedCreatedAt = (value: unknown): value is Level.SerializedCreatedAt =>
  typeof value === 'number' && value >= 0;

/* -------------------------------------------------------------------------- */

export const serializedUpdatedAt = (value: unknown): value is Level.SerializedUpdatedAt =>
  typeof value === 'number' && value >= 0;
