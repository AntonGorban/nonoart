import { D } from '@nono-art/domain';
import type { ProtoExtends } from '@nono-art/types';
import { uuidV4 } from '@nono-art/utils';

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const initialState: State = [
  {
    id: uuidV4(),
    name: 'Сердечко',
    description: 'Сердечко',
    likesCount: 65,
    dislikesCount: 4,
    status: D.Level.Status.done,
    createdAt: 1722684941265,
    colors: ['#000a12', '#ff1744', '#ffab00'],
    grid: [
      [null, 0, 0, 0, null, null, 0, 0, 0, null],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 2, 1, 1, 2, 1, 1, 0],
      [0, 1, 1, 1, 2, 2, 1, 1, 1, 0],
      [0, 1, 1, 2, 2, 2, 2, 1, 1, 0],
      [null, 0, 1, 1, 2, 2, 1, 1, 0, null],
      [null, null, 0, 1, 1, 1, 1, 0, null, null],
      [null, null, null, 0, 1, 1, 0, null, null, null],
      [null, null, null, null, 0, 0, null, null, null, null],
    ],
  },
  {
    id: uuidV4(),
    name: 'Яблочко',
    description: 'Яблочко',
    likesCount: 20,
    dislikesCount: 13,
    status: D.Level.Status.done,
    createdAt: 1722771341265,
    colors: ['#fe4445', '#201a1c', '#4e7851'],
    grid: [
      [null, null, null, null, null, null, null, 2, null, null, null, null],
      [null, null, null, null, null, null, 2, null, null, null, null, null],
      [null, null, null, null, 1, 1, 2, 1, null, null, null, null],
      [null, null, 1, 1, 0, 2, 2, 0, 1, 1, null, null],
      [null, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, null],
      [null, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, null],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [null, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, null],
      [null, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, null],
      [null, null, 1, 0, 0, 1, 1, 0, 0, 1, null, null],
      [null, null, null, 1, 1, null, null, 1, 1, null, null, null],
    ],
  },
  {
    id: uuidV4(),
    name: 'Кошара',
    description: 'Кошара',
    likesCount: 34,
    dislikesCount: 9,
    status: D.Level.Status.done,
    createdAt: 1722771341265,
    colors: ['#a1887f', '#1b1b1b', '#ff9777'],
    grid: [
      [0, 0, 0, null, null, null, null, 0, 0, 0],
      [0, 2, 2, 0, 0, 0, 0, 2, 2, 0],
      [0, null, null, null, null, null, null, null, null, 0],
      [0, null, 0, 1, null, null, 1, 0, null, 0],
      [0, null, 0, 0, null, null, 0, 0, null, 0],
      [0, 0, null, null, 1, 1, null, null, 0, 0],
      [0, 2, null, null, null, null, null, null, 2, 0],
      [0, 2, 2, null, 1, 1, null, 2, 2, 0],
      [null, 0, 0, null, null, null, null, 0, 0, null],
      [null, null, null, 0, 0, 0, 0, null, null, null],
    ],
  },
  {
    id: uuidV4(),
    name: 'Помидорчик',
    description: 'Помидорчик',
    likesCount: 33,
    dislikesCount: 12,
    status: D.Level.Status.done,
    createdAt: 1722944141265,
    colors: ['#1b1b1b', '#dd2c00', '#2c9846'],
    grid: [
      [null, null, null, null, null, null, null, 0, 0, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, 0, 2, 2, 0, null, null, null, null, null, null],
      [null, null, null, null, 0, 0, 2, 2, 2, 2, 0, 0, null, null, null, null],
      [null, null, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, null, null],
      [null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, null],
      [null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, null],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, null, 0, 1, 1, 1, 1, 1, 1, 0, null, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, null],
      [null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, null],
      [null, null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, null, null],
      [null, null, null, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, null, null, null],
      [null, null, null, null, null, 0, 0, 0, 0, 0, 0, null, null, null, null, null],
    ],
  },
  {
    id: uuidV4(),
    name: 'Лягушка',
    description: 'Лягушка',
    likesCount: 72,
    dislikesCount: 14,
    status: D.Level.Status.updated,
    createdAt: 1729774541265,
    colors: ['#000000', '#009F00', '#F5CE3C'],
    grid: [
      [null, 0, 0, 0, 0, null, null, null, null, null, 0, 0, 0, 0, null],
      [0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0],
      [0, 2, 0, 0, 2, 0, 1, 1, 1, 0, 2, 0, 0, 2, 0],
      [0, 2, 2, 2, 2, 0, 1, 1, 1, 0, 2, 2, 2, 2, 0],
      [null, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, null],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null],
      [null, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, null],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, null],
      [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, null, null, 0, 1, 1, 0, 0, 0, 0],
      [null, null, 0, 0, 0, null, null, null, null, 0, 0, 0, null, null, null],
    ],
  },
  {
    id: uuidV4(),
    name: 'Кактус',
    description: 'Кактус',
    likesCount: null,
    dislikesCount: null,
    status: D.Level.Status.new,
    createdAt: 1731843341265,
    colors: ['#000000', '#FA3F16', '#56AF61'],
    grid: [
      [null, null, null, null, null, null, 0, 0, 0, 0, null, null, null, null, null, null],
      [null, null, null, null, null, 0, 2, 2, 2, 2, 0, null, 0, null, null, null],
      [null, null, null, null, 0, 2, 2, 2, 0, 2, 2, 0, 2, 0, null, null],
      [null, null, null, null, 0, 2, 0, 2, 2, 2, 2, 0, 0, null, null, null],
      [null, null, null, null, 0, 2, 2, 2, 2, 0, 2, 0, null, null, null, null],
      [null, null, null, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0, null, null],
      [null, null, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, null],
      [null, null, null, 0, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, null, null],
      [null, null, null, null, 0, 2, 2, 2, 2, 2, 2, 0, null, null, null, null],
      [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null],
      [null, null, null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, null, null, null],
      [null, null, null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, null, null, null],
      [null, null, null, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, null, null, null],
      [null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null],
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 / CONSTANTS                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type State = StoreMyLevelList;

/* -------------------------------------------------------------------------- */

export type MyLevelList = ReadonlyArray<MyLevel>;

export interface MyLevel extends ProtoExtends<
  StoreMyLevel,
  {
    readonly createdAt: D.Level.CreatedAt;
  }
> {
  readonly gridWidth: number;
  readonly gridHeight: number;
  readonly complexity: number;
}

/* -------------------------------------------------------------------------- */

export type StoreMyLevelList = ReadonlyArray<StoreMyLevel>;

export interface StoreMyLevel {
  readonly id: D.Level.Id;
  readonly name: D.Level.Name;
  readonly description: D.Level.Description;
  readonly status: D.Level.Status;
  readonly colors: D.Level.Colors;
  readonly grid: D.Level.Grid;
  readonly likesCount: D.Level.LikesCount | null;
  readonly dislikesCount: D.Level.DislikesCount | null;
  readonly createdAt: D.Level.SerializedCreatedAt;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
