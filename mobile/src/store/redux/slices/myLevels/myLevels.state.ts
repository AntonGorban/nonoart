import type { D } from '@nono-art/domain';
import type { ProtoExtends } from '@nono-art/types';
import { uuidV4 } from '@nono-art/utils';

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const initialState: State = [
  {
    id: uuidV4(),
    name: 'Сердечко',
    likes: 65,
    dislikes: 4,
    status: 'done',
    createdAt: '2024-08-03T11:35:41.265Z',
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
    likes: 20,
    dislikes: 13,
    status: 'done',
    createdAt: '2024-08-04T11:35:41.265Z',
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
    likes: 34,
    dislikes: 9,
    status: 'done',
    createdAt: '2024-08-04T11:35:41.265Z',
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
    likes: 33,
    dislikes: 12,
    status: 'done',
    createdAt: '2024-08-06T11:35:41.265Z',
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
    likes: 72,
    dislikes: 14,
    status: 'updated',
    createdAt: '2024-10-24T11:35:41.265Z',
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
    likes: null,
    dislikes: null,
    status: 'new',
    createdAt: '2024-11-17T11:35:41.265Z',
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

export type StoreMyLevelList = ReadonlyArray<StoreMyLevel>;

export interface StoreMyLevel {
  readonly id: string;
  readonly name: string;
  readonly grid: D.Level.Grid;
  readonly colors: D.Level.Colors;
  readonly likes: number | null;
  readonly dislikes: number | null;
  readonly status: 'new' | 'done' | 'updated';
  readonly createdAt: string;
}

export type MyLevelList = ReadonlyArray<MyLevel>;

export interface MyLevel extends ProtoExtends<
  StoreMyLevel,
  {
    readonly createdAt: Date;
  }
> {
  readonly gridWidth: number;
  readonly gridHeight: number;
  readonly complexity: number;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
