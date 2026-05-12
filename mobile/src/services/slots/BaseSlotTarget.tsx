import { useLayoutEffect, useState } from 'react';

import { useSlotsContext } from './context';
import type { BaseProps } from './types';

export const BaseSlotTarget: React.FC<BaseProps> = ({ children, label }) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  const { addSlotSetter, removeSlotSetter } = useSlotsContext();
  useLayoutEffect(() => {
    if (!!addSlotSetter && !!removeSlotSetter) {
      addSlotSetter(label, setContent);
      return () => removeSlotSetter(label);
    } else {
      console.warn(`SlotTarget[${label}] must by used inside SlotsContextProvider`);
    }
  }, [addSlotSetter, label, removeSlotSetter]);

  return (
    <>
      {content}
      {children}
    </>
  );
};
