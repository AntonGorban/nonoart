import React, { useLayoutEffect } from 'react';

import { useStoreActions } from '@/store';

import { LevelNotFoundPlugPresentation } from './LevelNotFoundPlug.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelNotFoundPlug = React.memo<Props>(() => {
  const {
    config: { setAppHeaderTitle },
  } = useStoreActions();

  useLayoutEffect(() => {
    setAppHeaderTitle('Уровень не найден');
  }, [setAppHeaderTitle]);

  return <LevelNotFoundPlugPresentation />;
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
