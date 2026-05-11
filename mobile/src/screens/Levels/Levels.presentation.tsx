import React, { type ComponentProps } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { D } from '@nono-art/domain';

import { Level, ScreenView } from '@/components';
import type { LevelList, Level as LevelType } from '@/store';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelsPresentation = React.memo<Props>(({ levelList, navToGame, ...props }) => (
  <ScreenView padding={0} gap={0}>
    <FlatList
      data={levelList}
      style={styles.flatList}
      contentContainerStyle={styles.wrap}
      renderItem={({ item: level }) => (
        <Level
          {...props}
          id={level.id}
          name={level.name}
          authorName={level.authorName}
          colors={level.colors}
          status={level.status}
          grid={level.status === D.Level.Status.new ? level.grid : level.progress}
          gridWidth={level.gridWidth}
          gridHeight={level.gridHeight}
          complexity={level.complexity}
          likesCount={level.likesCount}
          dislikesCount={level.dislikesCount}
          showArtIconPlug={level.status === D.Level.Status.new}
          onPress={navToGame}
        />
      )}
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

interface Props extends Omit<LevelProps, keyof LevelType | 'onPress'> {
  readonly levelList: LevelList;
  readonly navToGame: (id: D.Level.Id) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
