import * as Clipboard from 'expo-clipboard';
import Color from 'color';
import React, { useCallback, useMemo } from 'react';
import { Alert, Platform, ToastAndroid } from 'react-native';

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
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Скопировано: ${colorCode} (${color})`, ToastAndroid.SHORT);
    } else {
      Alert.alert('Скопировано', `${colorCode} (${color})`, [{ text: 'OK' }]);
    }
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
