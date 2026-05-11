import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const CellPresentation = React.memo<Props>(
  ({ size, color, selectedColor, artCellBorderRadiusModifier, onPress }) => (
    <TouchableRipple
      onPress={onPress}
      rippleColor={selectedColor}
      borderless
      style={[styles.touchable, { borderRadius: size * artCellBorderRadiusModifier }]}
    >
      <View style={[styles.cell, { width: size, height: size, backgroundColor: color }]} />
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
  cell: {},
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly size: number;
  readonly color: string;
  readonly selectedColor?: string;
  readonly artCellBorderRadiusModifier: number;
  readonly onPress?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
