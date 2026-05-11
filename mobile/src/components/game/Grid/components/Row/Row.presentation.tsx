import React, { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { Cell } from '../Cell';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const RowPresentation = React.memo<Props>(({ row, rowIdx, artGapSize, ...props }) => (
  <View style={[styles.wrap, { gap: artGapSize }]}>
    {row.map((cell, cellIdx) => (
      <Cell {...props} key={cellIdx} value={cell} cellIdx={cellIdx} />
    ))}
  </View>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
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

type CellProps = ComponentProps<typeof Cell>;

interface Props extends Omit<CellProps, 'value' | 'cellIdx'> {
  readonly row: ReadonlyArray<CellProps['value']>;
  readonly rowIdx: number;
  readonly artGapSize: number;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
