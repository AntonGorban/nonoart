import type { UUID } from './common';
import type { User } from './User';

export namespace Level {
  export type Id = UUID;

  export type Name = string;

  export type Description = string;

  export type Color = string;

  export type Colors = [Color, Color, Color];

  export type Cell = 0 | 1 | 2 | null;

  export type Grid = ReadonlyArray<ReadonlyArray<Cell>>;

  export type AuthorID = User.Id;
  export type Author = User;

  export type CreatedAt = Date;
  export type UpdatedAt = Date;
  export type DeletedAt = Date | null;
}

/* -------------------------------------------------------------------------- */

export interface Level {
  readonly id: Level.Id;
  readonly name: Level.Name;
  readonly description: Level.Description;
  readonly colors: Level.Colors;
  readonly grid: Level.Grid;
  readonly authorId: Level.AuthorID | null;
  readonly createdAt: Level.CreatedAt;
  readonly updatedAt: Level.UpdatedAt;
  readonly deletedAt: Level.DeletedAt;
}

/* -------------------------------------------------------------------------- */

export interface LevelDB extends Omit<Level, 'colors' | 'author'> {
  readonly color0: Level.Color;
  readonly color1: Level.Color;
  readonly color2: Level.Color;
}
