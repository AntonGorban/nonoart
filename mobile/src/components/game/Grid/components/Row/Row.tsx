import React, { type ComponentProps, useMemo } from 'react';

import { useStoreSelectors } from '@/store';

import { RowPresentation } from './Row.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Row = React.memo<Props>(({ rowIdx, onPress, ...props }) => {
  const {
    config: { artGapSize },
  } = useStoreSelectors();

  const onPressHandler = useMemo<((cellIdx: number) => void) | undefined>(
    () => (onPress !== undefined ? (cellIdx) => onPress(rowIdx, cellIdx) : undefined),
    [onPress, rowIdx],
  );

  /* --------------------------------- RETURN --------------------------------- */

  return <RowPresentation {...props} rowIdx={rowIdx} onPress={onPressHandler} artGapSize={artGapSize} />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type RowPresentationProps = ComponentProps<typeof RowPresentation>;

interface Props extends Omit<RowPresentationProps, 'onPress' | 'artGapSize'> {
  readonly onPress?: (row: number, cell: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
