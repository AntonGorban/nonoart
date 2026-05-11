import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { D } from '@nono-art/domain';

import { initialState, type StoreMyLevelList } from './myLevels.state';

export const slice = createSlice({
  name: 'MY-LEVELS',
  initialState,

  /* -------------------------------------------------------------------------- */
  /*                                  REDUCERS                                  */
  /* -------------------------------------------------------------------------- */

  reducers: {
    createMyLevel: (state, action: PayloadAction<string>) => {
      return [
        {
          id: action.payload,
          name: '',
          description: '',
          likes: null,
          dislikes: null,
          status: D.Level.Status.new,
          createdAt: new Date().getTime(),
          colors: ['#ff0000', '#00ff00', '#0000ff'],
          grid: [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
          ],
          likesCount: null,
          dislikesCount: null,
        },
        ...state,
      ];
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 / REDUCERS                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  SELECTORS                                 */
  /* -------------------------------------------------------------------------- */

  selectors: {
    rawMyLevelList: (s): StoreMyLevelList => s,
  },

  /* -------------------------------------------------------------------------- */
  /*                                 / SELECTORS                                */
  /* -------------------------------------------------------------------------- */
});

export const { actions, selectors, name, reducer } = slice;

export type Action<T extends keyof typeof actions> = (...args: Parameters<(typeof actions)[T]>) => void;
export type Selectors = { [key in keyof typeof selectors]: ReturnType<(typeof selectors)[key]> };
