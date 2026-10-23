import type { UUID } from './common.domain';
import type { Level as LevelDomain } from './Level.domain';
import type { User as UserDomain } from './User.domain';

export namespace LevelProgress {
  export type Id = UUID;

  export type Progress = LevelDomain.Grid;
  export type SelectedColor = NonNullable<LevelDomain.Cell>;

  export type UserID = UserDomain.Id;
  export type User = UserDomain;

  export type LevelID = LevelDomain.Id;
  export type Level = LevelDomain;

  export enum Status {
    new = 'NEW',
    progress = 'PROGRESS',
    done = 'DONE',
  }

  export type CreatedAt = Date;
  export type SerializedCreatedAt = number;

  export type UpdatedAt = Date;
  export type SerializedUpdatedAt = number;
}
