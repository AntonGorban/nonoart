import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
          likes: null,
          dislikes: null,
          status: 'new',
          createdAt: new Date().toString(),
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
