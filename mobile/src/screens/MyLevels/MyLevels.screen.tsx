import { useCallback } from 'react';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UI } from '@nono-art/ui-mobile';

import { useSetAppHeader } from '@/hooks';

import type { RootStackParamList } from '../routes';

import { MyLevels } from './MyLevels';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const MyLevelsScreen: React.FC<Props> = ({ navigation }) => {
  const navToDesigner = useCallback(
    (myLevelId: string) => {
      navigation.push('Designer', { myLevelId });
    },
    [navigation],
  );

  useSetAppHeader({
    title: 'Мои уровни',
    icon: (
      <>
        <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

        <FontAwesome name="paint-brush" size={18} color={UI.color.white} />
      </>
    ),
    actionList: null,
  });

  /* --------------------------------- RETURN --------------------------------- */

  return <MyLevels navToDesigner={navToDesigner} />;
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'MyLevels'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
