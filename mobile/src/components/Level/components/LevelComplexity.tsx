import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelComplexity = React.memo<Props>(({ gridWidth, gridHeight, complexity }) => (
  <View style={styles.wrap}>
    <View style={styles.sizeWrap}>
      <Text style={styles.sizeCounter}>{gridWidth}</Text>

      <Text style={styles.sizeCounterCross}>{'\u00d7'}</Text>

      <Text style={styles.sizeCounter}>{gridHeight}</Text>
    </View>

    <View style={styles.complexityWrap}>
      <Text style={styles.complexityCounter}>{complexity}</Text>

      <MaterialCommunityIcons name="skull" size={14} color={UI.color.greyWhite} />
    </View>
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
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    gap: 2,
  },
  sizeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeCounter: {
    fontSize: 14,
    color: UI.color.greyWhite,
  },
  sizeCounterCross: {
    fontSize: 14,
    color: UI.color.grey,
  },
  complexityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  complexityCounter: {
    fontSize: 14,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly gridWidth: D.Level.GridWidth;
  readonly gridHeight: D.Level.GridHeight;
  readonly complexity: D.Level.Complexity;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
