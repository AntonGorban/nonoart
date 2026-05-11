import React, { type ComponentProps, useMemo } from 'react';

import { useStoreSelectors } from '@/store';

import { CounterPresentation } from './Counter.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Counter = React.memo<Props>(({ idx, onPress, ...props }) => {
  const {
    config: { artCellBorderRadiusModifier, artCounterSizeModifier },
  } = useStoreSelectors();

  const onPressHandler = useMemo<(() => void) | undefined>(
    () => (onPress !== undefined ? () => onPress(idx) : undefined),
    [idx, onPress],
  );

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <CounterPresentation
      {...props}
      onPress={onPressHandler}
      artCellBorderRadiusModifier={artCellBorderRadiusModifier}
      artCounterSizeModifier={artCounterSizeModifier}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type CounterPresentationProps = ComponentProps<typeof CounterPresentation>;

interface Props extends Omit<
  CounterPresentationProps,
  'onPress' | 'artCellBorderRadiusModifier' | 'artCounterSizeModifier'
> {
  readonly idx: number;
  readonly onPress?: (idx: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
