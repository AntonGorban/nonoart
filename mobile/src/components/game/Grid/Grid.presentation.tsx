import React, { type ComponentProps } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { CounterList, RestoreButton, Row } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const GridPresentation = React.memo<Props>(
  ({
    grid,
    isDone,
    colors,
    selectedColor,
    showCounters,
    rowCounterList,
    colCounterList,
    size,
    artGapSize,
    onLayoutArt,
    onPressCell,
    onPressRowCounter,
    onPressColCounter,
    onPressRestore,
  }) => (
    <View style={[styles.mainWrap, { gap: artGapSize }]} onLayout={onLayoutArt}>
      {showCounters ? (
        <>
          <View style={[styles.wrapWithCountersTop, { gap: artGapSize }]}>
            <RestoreButton size={size} isDone={isDone} onPress={onPressRestore} />

            <CounterList
              size={size}
              colors={colors}
              counterList={colCounterList}
              isRow={false}
              onPress={onPressColCounter}
            />
          </View>

          <View style={[styles.wrapWithCountersBottom, { gap: artGapSize }]}>
            <CounterList
              size={size}
              colors={colors}
              counterList={rowCounterList}
              isRow={true}
              onPress={onPressRowCounter}
            />

            <View style={[styles.gameGridWrap, { gap: artGapSize }]}>
              {grid.map((row, rowIdx) => (
                <Row
                  colors={colors}
                  selectedColor={selectedColor}
                  key={rowIdx}
                  row={row}
                  rowIdx={rowIdx}
                  size={size}
                  onPress={onPressCell}
                />
              ))}
            </View>
          </View>
        </>
      ) : (
        grid.map((row, rowIdx) => (
          <Row
            colors={colors}
            selectedColor={selectedColor}
            key={rowIdx}
            row={row}
            rowIdx={rowIdx}
            size={size}
            onPress={onPressCell}
          />
        ))
      )}
    </View>
  ),
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapWithCountersTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapWithCountersBottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameGridWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type RowProps = ComponentProps<typeof Row>;
type CounterListProps = ComponentProps<typeof CounterList>;
type RestoreButtonProps = ComponentProps<typeof RestoreButton>;

/* -------------------------------------------------------------------------- */

interface Props
  extends
    Omit<RowProps, 'row' | 'rowIdx' | 'size' | 'onPress'>,
    Omit<CounterListProps, 'counterList' | 'isRow' | 'onPress'>,
    Omit<RestoreButtonProps, 'onPress'> {
  readonly grid: ReadonlyArray<RowProps['row']>;
  readonly rowCounterList: CounterListProps['counterList'];
  readonly colCounterList: CounterListProps['counterList'];
  readonly showCounters?: boolean;
  readonly artGapSize: number;
  readonly onLayoutArt: (event: LayoutChangeEvent) => void;
  readonly onPressCell?: RowProps['onPress'];
  readonly onPressRowCounter?: CounterListProps['onPress'];
  readonly onPressColCounter?: CounterListProps['onPress'];
  readonly onPressRestore?: RestoreButtonProps['onPress'];
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
