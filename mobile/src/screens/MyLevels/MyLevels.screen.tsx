import { useCallback } from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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
