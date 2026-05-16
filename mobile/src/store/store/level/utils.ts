import { D } from '@nono-art/domain';
import { isObjectLike } from '@nono-art/utils';

import type { SerializedLevel, StoreLevel } from './types';

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

export const getAsyncStorageKey = (id: D.Level.Id): string => `LEVEL/${id}`;

/* -------------------------------------------------------------------------- */

export const parse = (str: string): unknown => {
  return JSON.parse(str);
};

/* -------------------------------------------------------------------------- */

export const stringify = (level: SerializedLevel): string => {
  return JSON.stringify(level);
};

/* -------------------------------------------------------------------------- */

export const normalize = (raw: unknown): SerializedLevel => {
  if (!isObjectLike(raw)) throw new Error('');

  const id = D.normalizers.level.id(raw['id']);
  const name = D.normalizers.level.name(raw['name']);
  const description = D.normalizers.level.description(raw['description']);
  const colors = D.normalizers.level.colors(raw['colors']);
  const grid = D.normalizers.level.grid(raw['grid']);
  const progress = D.normalizers.level.grid(raw['progress']);
  const authorId = D.normalizers.level.authorId(raw['authorId']);
  const authorName = D.normalizers.level.authorName(raw['authorName']);
  const status = D.normalizers.level.status(raw['status']);
  const likesCount = D.normalizers.level.likesCount(raw['likesCount']);
  const dislikesCount = D.normalizers.level.dislikesCount(raw['dislikesCount']);
  const progressUpdatedAt = D.normalizers.level.serializedProgressUpdatedAt(raw['progressUpdatedAt']);
  const createdAt = D.normalizers.level.serializedCreatedAt(raw['createdAt']);
  const updatedAt = D.normalizers.level.serializedUpdatedAt(raw['updatedAt']);

  return {
    id,
    name,
    description,
    colors,
    grid,
    progress,
    authorId,
    authorName,
    status,
    likesCount,
    dislikesCount,
    progressUpdatedAt,
    createdAt,
    updatedAt,
  };
};

/* -------------------------------------------------------------------------- */

export const deserialize = (level: SerializedLevel): StoreLevel => {
  return {
    ...level,
    progressUpdatedAt: new Date(level.progressUpdatedAt),
    createdAt: new Date(level.createdAt),
    updatedAt: new Date(level.updatedAt),
  };
};

/* -------------------------------------------------------------------------- */

export const serialize = (level: StoreLevel): SerializedLevel => {
  return {
    ...level,
    progressUpdatedAt: level.progressUpdatedAt.getTime(),
    createdAt: level.createdAt.getTime(),
    updatedAt: level.updatedAt.getTime(),
  };
};

/* -------------------------------------------------------------------------- */

export const createNewProgress = (width: number, height: number): D.Level.Grid =>
  new Array(height).fill(new Array(width).fill(null));

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */
