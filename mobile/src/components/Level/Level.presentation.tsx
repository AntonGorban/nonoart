import Color from 'color';
import React, { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { UI } from '@nono-art/ui-mobile';

import { ArtIcon, ArtIconPlug, LevelColors, LevelComplexity, LevelHeader, LevelSocial } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelPresentation = React.memo<Props>(
  ({
    name,
    authorName,
    createdAt,
    colors,
    status,
    grid,
    gridWidth,
    gridHeight,
    complexity,
    likesCount,
    dislikesCount,
    showArtIconPlug,
    onPress,
  }) => (
    <TouchableRipple
      onPress={onPress}
      rippleColor={Color(UI.color.primary).alpha(0.7).string()}
      borderless
      style={styles.touchable}
    >
      <View style={styles.wrap}>
        {showArtIconPlug ? <ArtIconPlug /> : <ArtIcon grid={grid} colors={colors} />}

        <View style={styles.contentWrap}>
          <View style={styles.HeaderSectionWrap}>
            <LevelHeader name={name} authorName={authorName} createdAt={createdAt} status={status} />

            <LevelComplexity gridWidth={gridWidth} gridHeight={gridHeight} complexity={complexity} />
          </View>

          <UI.Layout.Divider margin={0} />

          <View style={styles.footerSectionWrap}>
            <LevelSocial likesCount={likesCount} dislikesCount={dislikesCount} />

            <LevelColors colors={colors} />
          </View>
        </View>
      </View>
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

interface Props extends ArtIconProps, LevelHeaderProps, LevelComplexityProps, LevelSocialProps, LevelColorsProps {
  readonly showArtIconPlug: boolean;
  readonly onPress: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
