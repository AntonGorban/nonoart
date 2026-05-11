import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './config.state';

export const slice = createSlice({
  name: 'CONFIG',
  initialState,

  /* -------------------------------------------------------------------------- */
  /*                                  REDUCERS                                  */
  /* -------------------------------------------------------------------------- */

  reducers: {
    setAppHeaderTitle: (state, action: PayloadAction<string>) => {
      state.appHeaderTitle = action.payload;
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                 / REDUCERS                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  SELECTORS                                 */
  /* -------------------------------------------------------------------------- */

  selectors: {
    appHeaderTitle: (s) => s.appHeaderTitle,
    artGapSize: (s) => s.artGapSize,
    artCounterSizeModifier: (s) => s.artCounterSizeModifier,
    artCellBorderRadiusModifier: (s) => s.artCellBorderRadiusModifier,
  },

  /* -------------------------------------------------------------------------- */
  /*                                 / SELECTORS                                */
  /* -------------------------------------------------------------------------- */
});

export const { actions, selectors, name, reducer } = slice;

export type Action<T extends keyof typeof actions> = (...args: Parameters<(typeof actions)[T]>) => void;
export type Selectors = { [key in keyof typeof selectors]: ReturnType<(typeof selectors)[key]> };
