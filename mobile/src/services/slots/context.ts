import { createContext, useContext } from 'react';

import type { AddSlotSetter, GetSlotSetter, RemoveSlotSetter } from './types';

export const SlotsContext = createContext<{
  readonly getSlotSetter: GetSlotSetter | null;
  readonly addSlotSetter: AddSlotSetter | null;
  readonly removeSlotSetter: RemoveSlotSetter | null;
}>({
  getSlotSetter: null,
  addSlotSetter: null,
  removeSlotSetter: null,
});

export const useSlotsContext = () => useContext(SlotsContext);
