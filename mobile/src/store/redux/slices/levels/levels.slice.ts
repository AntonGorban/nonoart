import { createSlice } from '@reduxjs/toolkit';

import { initialState, type StateLevelList } from './levels.state';

export const slice = createSlice({
  name: 'LEVELS',
  initialState,

  /* -------------------------------------------------------------------------- */
  /*                                  REDUCERS                                  */
  /* -------------------------------------------------------------------------- */

  reducers: {},

  /* -------------------------------------------------------------------------- */
  /*                                 / REDUCERS                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  SELECTORS                                 */
  /* -------------------------------------------------------------------------- */

  selectors: {
    rawLevelList: (s): StateLevelList => s,
  },

  /* -------------------------------------------------------------------------- */
  /*                                 / SELECTORS                                */
  /* -------------------------------------------------------------------------- */
});

export const { actions, selectors, name, reducer } = slice;

export type Action<T extends keyof typeof actions> = (...args: Parameters<(typeof actions)[T]>) => void;
export type Selectors = { [key in keyof typeof selectors]: ReturnType<(typeof selectors)[key]> };
