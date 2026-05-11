import React, { type ComponentProps, useCallback } from 'react';

import type { D } from '@nono-art/domain';

import { LevelPresentation } from './Level.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Level = React.memo<Props>(({ onPress, id, ...props }) => {
  const onPressHandler = useCallback(() => onPress(id), [id, onPress]);

  /* --------------------------------- RETURN --------------------------------- */

  return <LevelPresentation {...props} onPress={onPressHandler} />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type LevelPresentationProps = ComponentProps<typeof LevelPresentation>;

/* -------------------------------------------------------------------------- */

interface Props extends Omit<LevelPresentationProps, 'onPress'> {
  readonly id: D.Level.Id;
  readonly onPress: (id: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
