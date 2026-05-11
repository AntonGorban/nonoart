import React, { type ComponentProps, useCallback, useEffect, useMemo, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';

import type { D } from '@nono-art/domain';

import { useStoreSelectors } from '@/store';

import { GridPresentation } from './Grid.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Grid = React.memo<Props>(({ grid, gridWidth, gridHeight, showCounters, ...props }) => {
  /* -------------------------------- settings -------------------------------- */

  const {
    config: { artCounterSizeModifier, artGapSize },
  } = useStoreSelectors();

  /* ------------------------------- / settings ------------------------------- */

  /* ---------------------------- size calculating ---------------------------- */

  const [size, setSize] = useState<number>(0);

  const [layoutSize, setLayoutSize] = useState<{
    readonly width: number;
    readonly height: number;
  }>({ width: 0, height: 0 });

  const onLayoutArt = useCallback((event: LayoutChangeEvent) => {
    setLayoutSize({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }, []);

  useEffect(() => {
    setSize(
      Math.min(
        Math.floor(layoutSize.width / (gridWidth + (showCounters ? artCounterSizeModifier : 0))),
        Math.floor(layoutSize.height / (gridHeight + (showCounters ? artCounterSizeModifier : 0))),
      ) - artGapSize,
    );
  }, [artCounterSizeModifier, artGapSize, gridHeight, gridWidth, layoutSize.height, layoutSize.width, showCounters]);

  /* --------------------------- / size calculating --------------------------- */

  /* -------------------------------- counters -------------------------------- */

  const { rowCounterList, colCounterList } = useMemo<{
    readonly rowCounterList: GridPresentationProps['rowCounterList'];
    readonly colCounterList: GridPresentationProps['colCounterList'];
  }>(() => {
    const rowCounterList: GridPresentationProps['rowCounterList'] = new Array(gridHeight)
      .fill(null)
      .map(() => [0, 0, 0]);
    const colCounterList: GridPresentationProps['colCounterList'] = new Array(gridWidth)
      .fill(null)
      .map(() => [0, 0, 0]);

    grid.forEach((row, rowIdx) =>
      row.forEach((col, colIdx) => {
        if (col !== null) {
          rowCounterList[rowIdx][col]++;
          colCounterList[colIdx][col]++;
        }
      }),
    );

    return { rowCounterList, colCounterList };
  }, [grid, gridHeight, gridWidth]);

  /* ------------------------------- / counters ------------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <GridPresentation
      {...props}
      grid={grid}
      showCounters={showCounters}
      rowCounterList={rowCounterList}
      colCounterList={colCounterList}
      size={size}
      artGapSize={artGapSize}
      onLayoutArt={onLayoutArt}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type GridPresentationProps = ComponentProps<typeof GridPresentation>;

interface Props extends Omit<
  GridPresentationProps,
  'rowCounterList' | 'colCounterList' | 'size' | 'artGapSize' | 'onLayoutArt'
> {
  readonly gridWidth: D.Level.GridWidth;
  readonly gridHeight: D.Level.GridHeight;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
