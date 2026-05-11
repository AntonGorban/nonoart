import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

export const RestoreButtonPresentation = React.memo<Props>(
  ({ isDone = false, size, artCellBorderRadiusModifier, artCounterSizeModifier, onPress }) => (
    <TouchableRipple
      onPress={onPress}
      rippleColor={UI.color.secondary}
      borderless
      style={[
        styles.touchable,
        {
          borderRadius: size * artCellBorderRadiusModifier,
          borderTopLeftRadius: size * artCellBorderRadiusModifier * 6,
          borderTopRightRadius: size * artCellBorderRadiusModifier * 2,
          borderBottomLeftRadius: size * artCellBorderRadiusModifier * 2,
        },
      ]}
    >
      <View style={[styles.wrap, { width: size * artCounterSizeModifier, height: size * artCounterSizeModifier }]}>
        {isDone ? (
          <MaterialCommunityIcons
            name="check-decagram-outline"
            size={safetyCalcIconSize(size)}
            color={UI.color.primary}
          />
        ) : (
          <MaterialCommunityIcons name="restore" size={safetyCalcIconSize(size)} color={UI.color.black700} />
        )}
      </View>
    </TouchableRipple>
  ),
);

/* -------------------------------------------------------------------------- */
/*                                / COMPONENTS                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  touchable: {},
  wrap: {
    backgroundColor: UI.color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

const safetyCalcIconSize = (size: number): number => {
  const iconSize = size * 2;

  if (iconSize <= 0) return 1;
  return iconSize;
};

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly isDone?: boolean;
  readonly size: number;
  readonly artCellBorderRadiusModifier: number;
  readonly artCounterSizeModifier: number;
  readonly onPress?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
