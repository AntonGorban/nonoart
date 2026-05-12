import { BaseSlotSource } from './BaseSlotSource';
import { BaseSlotTarget } from './BaseSlotTarget';
import type { Props } from './types';

export const createSlot = (label: string) => {
  const SlotTarget: React.FC<Props> = ({ children, ...props }) => (
    <BaseSlotTarget {...props} label={label}>
      {children}
    </BaseSlotTarget>
  );

  const SlotSource: React.FC<Props> = ({ children, ...props }) => (
    <BaseSlotSource {...props} label={label}>
      {children}
    </BaseSlotSource>
  );

  return { SlotTarget, SlotSource };
};
