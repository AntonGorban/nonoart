import { useCallback, useState } from 'react';

import { SlotsContext } from './context';
import type { AddSlotSetter, GetSlotSetter, RemoveSlotSetter, SlotSetter } from './types';

export const SlotsContextProvider: React.FC<{
  readonly children: React.ReactNode;
}> = ({ children }) => {
  const [slots, setSlots] = useState<Record<string, SlotSetter>>({});

  const getSlotSetter = useCallback<GetSlotSetter>((label) => slots[label] ?? null, [slots]);

  const addSlotSetter = useCallback<AddSlotSetter>(
    (label, slotSetter) => setSlots((p) => ({ ...p, [label]: slotSetter })),
    [],
  );

  const removeSlotSetter = useCallback<RemoveSlotSetter>(
    (label) =>
      setSlots((prev) => {
        const { [label]: _, ...rest } = prev;
        return rest;
      }),
    [],
  );

  return (
    <SlotsContext.Provider value={{ getSlotSetter, addSlotSetter, removeSlotSetter }}>{children}</SlotsContext.Provider>
  );
};
