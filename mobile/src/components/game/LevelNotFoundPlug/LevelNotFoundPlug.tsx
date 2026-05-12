import React from 'react';

import { AntDesign } from '@expo/vector-icons';

import { useSetAppHeader } from '@/hooks';

import { LevelNotFoundPlugPresentation } from './LevelNotFoundPlug.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelNotFoundPlug = React.memo<Props>(() => {
  useSetAppHeader({
    title: 'Уровень не найден',
    icon: <AntDesign name="file-unknown" size={14} color={UI.color.greyWhite} />,
    actionList: null,
  });

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
