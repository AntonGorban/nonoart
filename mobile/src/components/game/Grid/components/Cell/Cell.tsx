import React, { type ComponentProps, useMemo } from 'react';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

import { useStoreSelectors } from '@/store';

import { CellPresentation } from './Cell.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Cell = React.memo<Props>(
  ({ value, colors, selectedColor: selectedColorValue, cellIdx, onPress, ...props }) => {
    const {
      config: { artCellBorderRadiusModifier },
    } = useStoreSelectors();

    const color = useMemo<string>(() => (value !== null ? colors[value] : UI.color.white), [colors, value]);

    const selectedColor = useMemo<string | undefined>(
      () =>
        selectedColorValue !== undefined
          ? value === selectedColorValue
            ? UI.color.white
            : colors[selectedColorValue]
          : undefined,
      [colors, selectedColorValue, value],
    );

    const onPressHandler = useMemo<(() => void) | undefined>(
      () => (onPress !== undefined ? () => onPress(cellIdx) : undefined),
      [cellIdx, onPress],
    );

    /* --------------------------------- RETURN --------------------------------- */

    return (
      <CellPresentation
        color={color}
        selectedColor={selectedColor}
        onPress={onPressHandler}
        artCellBorderRadiusModifier={artCellBorderRadiusModifier}
        {...props}
      />
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type CellPresentationProps = ComponentProps<typeof CellPresentation>;

interface Props extends Omit<
  CellPresentationProps,
  'color' | 'selectedColor' | 'artCellBorderRadiusModifier' | 'onPress'
> {
  readonly value: D.Level.Cell;
  readonly colors: D.Level.Colors;
  readonly selectedColor?: D.Level.SelectedColor;
  readonly cellIdx: number;
  readonly onPress?: (cell: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
