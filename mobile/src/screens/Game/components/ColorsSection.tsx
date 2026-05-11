import React, { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

import { ColorButton } from './ColorButton';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ColorsSection = React.memo<Props>(({ colors, ...props }) => (
  <View style={styles.colorsWrap}>
    {colors.map((color, idx) => (
      <ColorButton key={idx} {...props} color={color} colorIdx={idx as D.Level.SelectedColor} />
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
  colorsWrap: {
    backgroundColor: UI.color.black900,
    width: '100%',
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderColor: UI.color.white,
    borderStyle: 'solid',
  },
});

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type ColorButtonProps = ComponentProps<typeof ColorButton>;

/* -------------------------------------------------------------------------- */

interface Props extends Omit<ColorButtonProps, 'color' | 'colorIdx'> {
  readonly colors: D.Level.Colors;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
