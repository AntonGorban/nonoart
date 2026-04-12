import type { UUID } from './common';
import type { Level } from './Level';

export namespace User {
  export type Id = UUID;

  export type Login = string;

  export type Password = string;

  export type LevelList = ReadonlyArray<Level>;

  export type CreatedAt = Date;
  export type UpdatedAt = Date;
  export type DeletedAt = Date | null;
}

export interface User {
  readonly id: User.Id;
  readonly login: User.Login;
  readonly password: User.Password;
  readonly createdAt: User.CreatedAt;
  readonly updatedAt: User.UpdatedAt;
  readonly deletedAt: User.DeletedAt;
}

export interface UserDB extends User {}
