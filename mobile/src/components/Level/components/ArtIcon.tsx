import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

import { ArtSvg } from '../../ArtSvg';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ArtIcon = React.memo<Props>(({ grid, colors }) => (
  <View style={styles.wrap}>
    <ArtSvg grid={grid} colors={colors} width="96%" height="96%" />
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
    width: 80,
    height: 80,
    backgroundColor: UI.color.white,
    borderRadius: 3,
    borderColor: UI.color.black300,
    borderRightWidth: 1,
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

interface Props {
  readonly grid: D.Level.Grid;
  readonly colors: D.Level.Colors;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
