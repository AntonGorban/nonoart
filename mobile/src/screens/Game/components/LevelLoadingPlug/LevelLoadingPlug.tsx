import React, { useLayoutEffect } from 'react';

import { useStoreActions } from '@/store';

import { LevelLoadingPlugPresentation } from './LevelLoadingPlug.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelLoadingPlug = React.memo<Props>(() => {
  const {
    config: { setAppHeaderTitle },
  } = useStoreActions();

  useLayoutEffect(() => {
    setAppHeaderTitle('Загрузка уровня...');
  }, [setAppHeaderTitle]);

  return <LevelLoadingPlugPresentation />;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
