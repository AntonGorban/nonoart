import React, { type ComponentProps, useCallback } from 'react';

import { LevelPresentation } from './Level.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Level = React.memo<Props>(({ level, navToGame, ...props }) => {
  const navToGameHandler = useCallback(() => navToGame(level.id), [navToGame, level.id]);

  /* --------------------------------- RETURN --------------------------------- */

  return <LevelPresentation {...props} level={level} navToGame={navToGameHandler} />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type LevelPresentationProps = ComponentProps<typeof LevelPresentation>;

/* -------------------------------------------------------------------------- */

interface Props extends Omit<LevelPresentationProps, 'navToGame'> {
  readonly navToGame: (id: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
