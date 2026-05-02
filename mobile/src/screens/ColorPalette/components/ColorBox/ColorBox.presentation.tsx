import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ColorBoxPresentation = React.memo<Props>(({ color, colorIsDark, colorCode }) => (
  <View style={[styles.box, { backgroundColor: color }]}>
    <Text style={[styles.label, { color: colorIsDark ? UI.color.white1 : UI.color.black999 }]}>{colorCode}</Text>
  </View>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  label: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 10,
    transform: [{ rotate: '90deg' }],
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
  readonly colorIsDark: boolean;
  readonly colorCode: string;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
