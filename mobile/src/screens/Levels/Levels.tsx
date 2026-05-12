import React, { type ComponentProps, useCallback } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { appHeaderStore, useStoreSelectors } from '@/store';

import { LevelsPresentation } from './Levels.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Levels = React.memo<Props>(({ navToGame }) => {
  const {
    levels: { levelList },
  } = useStoreSelectors();

  const navToGameHandler = useCallback(
    (levelId: string) => {
      appHeaderStore.set.state({
        title: 'Загрузка уровня...',
        icon: <ActivityIndicator size={14} animating />,
        actionList: null,
      });
      navToGame(levelId);
    },
    [navToGame],
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
