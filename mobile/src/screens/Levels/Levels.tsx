import React, { type ComponentProps, useCallback } from 'react';

import { useStoreActions, useStoreSelectors } from '@/store';

import { LevelsPresentation } from './Levels.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Levels = React.memo<Props>(({ navToGame }) => {
  const {
    levels: { levelList },
  } = useStoreSelectors();

  const {
    config: { setAppHeaderTitle },
  } = useStoreActions();

  const navToGameHandler = useCallback(
    (levelId: string) => {
      setAppHeaderTitle('загрузка уровня...');
      navToGame(levelId);
    },
    [navToGame, setAppHeaderTitle],
  );

  /* --------------------------------- RETURN --------------------------------- */

  return <LevelsPresentation levelList={levelList} navToGame={navToGameHandler} />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type LevelsPresentationProps = ComponentProps<typeof LevelsPresentation>;

interface Props extends Omit<LevelsPresentationProps, 'levelList'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
