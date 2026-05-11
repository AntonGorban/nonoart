import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const CounterPresentation = React.memo<Props>(
  ({ values, colors, size, isRow, onPress, artCellBorderRadiusModifier, artCounterSizeModifier }) => (
    <TouchableRipple
      onPress={onPress}
      rippleColor={UI.color.secondary}
      borderless
      style={[
        styles.touchable,
        {
          borderRadius: size * artCellBorderRadiusModifier,
          ...(isRow
            ? {
                borderTopLeftRadius: size * artCellBorderRadiusModifier * 2,
                borderBottomLeftRadius: size * artCellBorderRadiusModifier * 2,
              }
            : {
                borderTopLeftRadius: size * artCellBorderRadiusModifier * 2,
                borderTopRightRadius: size * artCellBorderRadiusModifier * 2,
              }),
        },
      ]}
    >
      <View
        style={[
          styles.wrap,
          {
            width: isRow ? size * artCounterSizeModifier : size,
            height: isRow ? size : size * artCounterSizeModifier,
            flexDirection: isRow ? 'row' : 'column',
          },
        ]}
      >
        {values.map((value, idx) => (
          <View key={idx} style={styles.counterWrap}>
            <Text style={[styles.counterText, { fontSize: safetyCalcFontSize(size), color: colors[idx] }]}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    </TouchableRipple>
  ),
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  touchable: {},
  wrap: {
    backgroundColor: UI.color.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 1,
  },
  counterWrap: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  counterText: {
    textAlign: 'center',
    fontWeight: 600,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

const safetyCalcFontSize = (size: number): number => {
  const fontSize = size / 2;

  if (fontSize <= 0) return 1;
  return fontSize;
};

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly values: [number, number, number];
  readonly colors: D.Level.Colors;
  readonly size: number;
  readonly isRow: boolean;
  readonly artCellBorderRadiusModifier: number;
  readonly artCounterSizeModifier: number;
  readonly onPress?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
