import Color from 'color';
import React, { useMemo } from 'react';

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

  return <ColorBoxPresentation color={color} colorIsDark={colorIsDark} colorCode={colorLabel} />;
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
