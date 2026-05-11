import React, { type ComponentProps } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ScreenView } from '@/components';
import type { LevelList, Level as LevelType } from '@/store';

import { Level } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelsPresentation = React.memo<Props>(({ levelList, ...props }) => (
  <ScreenView padding={0} gap={0}>
    <FlatList
      data={levelList}
      style={styles.flatList}
      contentContainerStyle={styles.wrap}
      renderItem={(level) => <Level {...props} level={level.item} />}
      keyExtractor={(level) => level.id}
      extraData={props}
    />
  </ScreenView>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  flatList: { width: '100%', paddingHorizontal: 8 },
  wrap: { gap: 8, paddingVertical: 8 },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type LevelProps = ComponentProps<typeof Level>;

interface Props extends Omit<LevelProps, keyof LevelType | 'level'> {
  readonly levelList: LevelList;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
