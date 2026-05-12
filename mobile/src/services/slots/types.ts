export type AddSlotSetter = (label: string, slotSetter: SlotSetter) => void;
export type GetSlotSetter = (label: string) => SlotSetter;
export type RemoveSlotSetter = (label: string) => void;
export type SlotSetter = (node: React.ReactNode) => void;

export interface Props {
  readonly children?: React.ReactNode;
}

export interface BaseProps {
  readonly label: string;
  readonly children: React.ReactNode;
}
