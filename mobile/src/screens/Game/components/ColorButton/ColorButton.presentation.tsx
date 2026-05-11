import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ColorButtonPresentation = React.memo<Props>(({ color, isSelected, onPress }) => (
  <TouchableRipple
    onPress={onPress}
    rippleColor={UI.color.white}
    borderless
    style={[styles.colorTouchable, isSelected ? styles.colorTouchableActive : [], { backgroundColor: color }]}
  >
    <View />
  </TouchableRipple>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  colorTouchable: {
    borderRadius: 20,
    width: 63,
    height: 63,
    borderColor: UI.color.white,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  colorTouchableActive: {
    borderRadius: 50,
    borderWidth: 3,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly color: string;
  readonly isSelected: boolean;
  readonly onPress: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
