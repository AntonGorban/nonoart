import React, { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { Counter } from '../Counter';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const CounterListPresentation = React.memo<Props>(({ counterList, artGapSize, ...props }) => (
  <View style={[styles.wrap, { flexDirection: props.isRow ? 'column' : 'row', gap: artGapSize }]}>
    {counterList.map((value, idx) => (
      <Counter {...props} key={idx} idx={idx} values={value} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    tYPES                                   */
/* -------------------------------------------------------------------------- */

type CounterProps = ComponentProps<typeof Counter>;

interface Props extends Omit<CounterProps, 'values' | 'idx'> {
  readonly counterList: ReadonlyArray<CounterProps['values']>;
  readonly artGapSize: number;
}

/* -------------------------------------------------------------------------- */
/*                                   / tYPES                                  */
/* -------------------------------------------------------------------------- */
