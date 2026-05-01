import { configureStore } from '@reduxjs/toolkit';

import { config, levels } from './slices';

export const store = configureStore({
  devTools: false,
  reducer: {
    [levels.name]: levels.reducer,
    // [myLevels.name]: myLevels.reducer,
    [config.name]: config.reducer,
  },
});
