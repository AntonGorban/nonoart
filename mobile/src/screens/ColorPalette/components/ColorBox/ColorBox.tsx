import * as Clipboard from 'expo-clipboard';
import Color from 'color';
import React, { useCallback, useMemo } from 'react';
import Toast from 'react-native-toast-message';

import { UI } from '@nono-art/ui-mobile';

import { ColorBoxPresentation } from './ColorBox.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ColorBox = React.memo<Props>(({ colorCode, viewFullColorCode = false }) => {
  const color = UI.color[colorCode];

  const colorIsDark = useMemo(() => Color(color).isDark(), [color]);

  const colorLabel = useMemo(
    () => (viewFullColorCode ? colorCode : colorCode.replace(/[^\dA]/g, '')),
    [colorCode, viewFullColorCode],
  );

  const handlePress = useCallback(async () => {
    await Clipboard.setStringAsync(color);
    Toast.show({
      text1: 'Цвет скопирован',
      text2: `${colorCode} (${color})`,
      visibilityTime: 1500,
    });
  }, [color, colorCode]);

  return (
    <ColorBoxPresentation color={color} colorIsDark={colorIsDark} colorCode={colorLabel} onTouchEnd={handlePress} />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly colorCode: keyof typeof UI.color;
  readonly viewFullColorCode?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
