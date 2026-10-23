import React, { type ComponentProps, useCallback, useMemo } from 'react';

import type { D } from '@nono-art/domain';

import { ColorButtonPresentation } from './ColorButton.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ColorButton = React.memo<Props>(({ colorIdx, selectedColor, setSelectedColor, ...props }) => {
  const isSelected = useMemo(() => colorIdx === selectedColor, [colorIdx, selectedColor]);

  const setSelectedColorHandler = useCallback(() => {
    setSelectedColor(colorIdx);
  }, [colorIdx, setSelectedColor]);

  /* --------------------------------- RETURN --------------------------------- */

  return <ColorButtonPresentation {...props} isSelected={isSelected} onPress={setSelectedColorHandler} />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type ColorButtonPresentationProps = ComponentProps<typeof ColorButtonPresentation>;

/* -------------------------------------------------------------------------- */

interface Props extends Omit<ColorButtonPresentationProps, 'isSelected' | 'onPress'> {
  readonly colorIdx: D.LevelProgress.SelectedColor;
  readonly selectedColor: D.LevelProgress.SelectedColor;
  readonly setSelectedColor: (color: D.LevelProgress.SelectedColor) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
