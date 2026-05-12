import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { useSetAppHeader } from '@/hooks';

import { LevelLoadingPlugPresentation } from './LevelLoadingPlug.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelLoadingPlug = React.memo<Props>(() => {
  useSetAppHeader({
    title: 'Загрузка уровня...',
    icon: <ActivityIndicator size={14} animating />,
    actionList: null,
  });

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
