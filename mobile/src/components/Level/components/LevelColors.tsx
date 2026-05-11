import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelColors = React.memo<Props>(({ colors }) => (
  <View style={styles.wrap}>
    {colors.map((color, idx) => (
      <View key={idx} style={[styles.color, { backgroundColor: color }]} />
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
    borderColor: UI.color.white,
    backgroundColor: UI.color.white,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 4,
    borderTopLeftRadius: 1,
    transform: [{ translateX: 2 }],
  },
  color: {
    width: 16,
    height: 16,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly colors: D.Level.Colors;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
