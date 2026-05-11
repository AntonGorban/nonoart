import React, { type ComponentProps } from 'react';

import { useStoreSelectors } from '@/store';

import { RestoreButtonPresentation } from './RestoreButton.presentation';

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

export const RestoreButton = React.memo<Props>(({ ...props }) => {
  const {
    config: { artCellBorderRadiusModifier, artCounterSizeModifier },
  } = useStoreSelectors();

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <RestoreButtonPresentation
      {...props}
      artCellBorderRadiusModifier={artCellBorderRadiusModifier}
      artCounterSizeModifier={artCounterSizeModifier}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                / COMPONENTS                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type RestoreButtonPresentationProps = ComponentProps<typeof RestoreButtonPresentation>;

interface Props extends Omit<
  RestoreButtonPresentationProps,
  'artCellBorderRadiusModifier' | 'artCounterSizeModifier'
> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
