import type { UUID } from './common';

export namespace User {
  export type Id = UUID;

  export type Login = string;

  export type Password = string;

  export type CreatedAt = Date;
  export type UpdatedAt = Date;
}

export interface User {
  readonly id: User.Id;
  readonly login: User.Login;
  readonly password: User.Password;
  readonly createdAt: User.CreatedAt;
  readonly updatedAt: User.UpdatedAt;
}
