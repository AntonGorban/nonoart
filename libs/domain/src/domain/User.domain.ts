import type { UUID } from './common.domain';
import type { Level } from './Level.domain';

export namespace User {
  export type Id = UUID;

  export type Login = string;

  export type Password = string;

  export enum Role {
    user = 'USER',
    moderator = 'MODERATOR',
    admin = 'ADMIN',
  }

  export type LevelList = ReadonlyArray<Level>;

  export type CreatedAt = Date;
  export type UpdatedAt = Date;
  export type DeletedAt = Date | null;
}

export interface User {
  readonly id: User.Id;
  readonly login: User.Login;
  readonly role: User.Role;
  readonly password: User.Password;
  readonly createdAt: User.CreatedAt;
  readonly updatedAt: User.UpdatedAt;
  readonly deletedAt: User.DeletedAt;
}

export interface UserDB extends User {}
