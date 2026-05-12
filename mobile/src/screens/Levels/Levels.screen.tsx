import { useCallback } from 'react';

import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UI } from '@nono-art/ui-mobile';

import { useSetAppHeader } from '@/hooks';

import type { RootStackParamList } from '../routes';

import { Levels } from './Levels';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelsScreen: React.FC<Props> = ({ navigation }) => {
  const navToGame = useCallback(
    (levelId: string) => {
      navigation.push('Game', { levelId });
    },
    [navigation],
  );

  useSetAppHeader({
    title: 'Уровни',
    icon: (
      <>
        <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

        <FontAwesome6 name="puzzle-piece" size={18} color={UI.color.white} />
      </>
    ),
    actionList: null,
  });

  /* --------------------------------- RETURN --------------------------------- */

  return <Levels navToGame={navToGame} />;
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'Levels'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
