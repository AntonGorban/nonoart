import type { D } from '@nono-art/domain';
import type { ProtoExtends } from '@nono-art/types';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface Level extends StoreLevel {
  readonly gridWidth: D.Level.GridWidth;
  readonly gridHeight: D.Level.GridHeight;
  readonly complexity: D.Level.Complexity;
}

/* -------------------------------------------------------------------------- */

export interface StoreLevel {
  readonly id: D.Level.Id;
  readonly name: D.Level.Name;
  readonly description: D.Level.Description;
  readonly colors: D.Level.Colors;
  readonly grid: D.Level.Grid;
  readonly progress: D.Level.Grid;
  readonly authorId: D.Level.AuthorID;
  readonly authorName: D.Level.Name;
  readonly status: D.Level.Status;
  readonly likesCount: D.Level.LikesCount;
  readonly dislikesCount: D.Level.DislikesCount;
  readonly progressUpdatedAt: D.Level.ProgressUpdatedAt;
  readonly createdAt: D.Level.CreatedAt;
  readonly updatedAt: D.Level.UpdatedAt;
}

/* -------------------------------------------------------------------------- */

export interface SerializedLevel extends ProtoExtends<
  StoreLevel,
  {
    readonly progressUpdatedAt: D.Level.SerializedProgressUpdatedAt;
    readonly createdAt: D.Level.SerializedCreatedAt;
    readonly updatedAt: D.Level.SerializedUpdatedAt;
  }
> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
