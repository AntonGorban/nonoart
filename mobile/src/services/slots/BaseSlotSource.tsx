import { useLayoutEffect } from 'react';

import { useSlotsContext } from './context';
import type { BaseProps } from './types';

export const BaseSlotSource: React.FC<BaseProps> = ({ children, label }) => {
  const { getSlotSetter } = useSlotsContext();

  useLayoutEffect(() => {
    if (!getSlotSetter) {
      console.warn(`SlotSource[${label}] must be used inside SlotsContextProvider`);
      return;
    }

    const slotSetter = getSlotSetter(label);
    if (!!slotSetter) {
      slotSetter(children);
      return () => slotSetter(null);
    } else {
      console.warn(`SlotSource: No SlotTarget found for label "${label}"`);
    }
  }, [getSlotSetter, label, children]); // children добавлен

  return null;
};
