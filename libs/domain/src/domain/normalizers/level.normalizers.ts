import * as asserts from '../asserts';
import { Level } from '../Level.domain';
import type { User } from '../User.domain';

/* -------------------------------------------------------------------------- */

export const id = (value: unknown): Level.Id => {
  if (asserts.level.id(value)) return value;
  throw new Error('Dad level id');
};

/* -------------------------------------------------------------------------- */

export const name = (value: unknown): Level.Name => {
  if (asserts.level.name(value)) return value;
  return '';
};

/* -------------------------------------------------------------------------- */

export const description = (value: unknown): Level.Description => {
  if (asserts.level.description(value)) return value;
  return '';
};

/* -------------------------------------------------------------------------- */

export const colors = (value: unknown): Level.Colors => {
  if (asserts.level.colors(value)) return value;
  return ['#FF0000', '#00FF00', '#0000FF'];
};

/* -------------------------------------------------------------------------- */

export const grid = (value: unknown): Level.Grid => {
  if (asserts.level.grid(value)) return value;
  throw new Error('bad level grid');
};

/* -------------------------------------------------------------------------- */

export const authorId = (value: unknown): Level.AuthorID => {
  if (asserts.level.authorId(value)) return value;
  throw new Error('bad level authorId');
};

/* -------------------------------------------------------------------------- */

export const authorName = (value: unknown): User.Login => {
  if (asserts.level.authorName(value)) return value;
  return '';
};

/* -------------------------------------------------------------------------- */

export const status = (value: unknown): Level.Status => {
  if (asserts.level.status(value)) return value;
  return Level.Status.new;
};

/* -------------------------------------------------------------------------- */

export const likesCount = (value: unknown): Level.LikesCount => {
  if (asserts.level.likesCount(value)) return value;
  return 0;
};

/* -------------------------------------------------------------------------- */

export const dislikesCount = (value: unknown): Level.DislikesCount => {
  if (asserts.level.dislikesCount(value)) return value;
  return 0;
};

/* -------------------------------------------------------------------------- */

export const serializedCreatedAt = (value: unknown): Level.SerializedCreatedAt => {
  if (asserts.level.serializedCreatedAt(value)) return value;
  return 0;
};

/* -------------------------------------------------------------------------- */

export const serializedUpdatedAt = (value: unknown): Level.SerializedUpdatedAt => {
  if (asserts.level.serializedUpdatedAt(value)) return value;
  return 0;
};
