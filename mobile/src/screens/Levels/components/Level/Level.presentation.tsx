import Color from 'color';
import React, { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

import type { Level } from '@/store';

import { ArtIcon } from '../ArtIcon';
import { ArtIconPlug } from '../ArtIconPlug';
import { LevelColors } from '../LevelColors';
import { LevelComplexity } from '../LevelComplexity';
import { LevelHeader } from '../LevelHeader';
import { LevelSocial } from '../LevelSocial';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelPresentation = React.memo<Props>(({ level, navToGame }) => (
  <TouchableRipple
    onPress={navToGame}
    rippleColor={Color(UI.color.primary).alpha(0.7).string()}
    borderless
    style={styles.touchable}
  >
    <View style={styles.wrap}>
      {level.status === D.Level.Status.new ? (
        <ArtIconPlug />
      ) : (
        <ArtIcon grid={level.status === D.Level.Status.done ? level.grid : level.progress} colors={level.colors} />
      )}

      <View style={styles.contentWrap}>
        <View style={styles.HeaderSectionWrap}>
          <LevelHeader name={level.name} authorName={level.authorName} status={level.status} />

          <LevelComplexity gridWidth={level.gridWidth} gridHeight={level.gridHeight} complexity={level.complexity} />
        </View>

        <UI.Layout.Divider margin={0} />

        <View style={styles.footerSectionWrap}>
          <LevelSocial likesCount={level.likesCount} dislikesCount={level.dislikesCount} />

          <LevelColors colors={level.colors} />
        </View>
      </View>
    </View>
  </TouchableRipple>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 5,
    borderColor: UI.color.black300,
    borderWidth: 1,
  },
  wrap: {
    width: '100%',
    backgroundColor: UI.color.black700,
    flexDirection: 'row',
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 3,
    gap: 3,
  },
  HeaderSectionWrap: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 4,
  },
  footerSectionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type ArtIconProps = ComponentProps<typeof ArtIcon>;
type LevelHeaderProps = ComponentProps<typeof LevelHeader>;
type LevelComplexityProps = ComponentProps<typeof LevelComplexity>;
type LevelSocialProps = ComponentProps<typeof LevelSocial>;
type LevelColorsProps = ComponentProps<typeof LevelColors>;

/* -------------------------------------------------------------------------- */

interface Props
  extends
    Omit<ArtIconProps, keyof Level>,
    Omit<LevelHeaderProps, keyof Level>,
    Omit<LevelComplexityProps, keyof Level>,
    Omit<LevelSocialProps, keyof Level>,
    Omit<LevelColorsProps, keyof Level> {
  readonly level: Level;
  readonly navToGame: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
