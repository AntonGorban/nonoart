import React, { useCallback } from 'react';

import { FontAwesome6 } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DAL } from '@nono-art/dal';
import { UI } from '@nono-art/ui-mobile';

import { ScreenView } from '@/components';
import { useSetAppHeader } from '@/hooks';

import type { RootStackParamList } from '../routes';

import { LinksSection, SignForm, UserSection } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const AccountScreen: React.FC<Props> = ({ navigation }) => {
  /* ---------------------------------- data ---------------------------------- */

  const { user, isAuth, isAdmin, signIn, signUp, signOut } = DAL.user.auth.useDAL();

  /* --------------------------------- / data --------------------------------- */

  /* ------------------------------- navigation ------------------------------- */

  const navToUsers = useCallback(() => {
    navigation.push('Users');
  }, [navigation]);

  const navToColorPalette = useCallback(() => {
    navigation.push('ColorPalette');
  }, [navigation]);

  const navToAsyncStorage = useCallback(() => {
    navigation.push('AsyncStorage');
  }, [navigation]);

  useSetAppHeader({
    title: 'Аккаунт',
    icon: <FontAwesome6 name="user-large" size={18} color={UI.color.white} />,
    actionList: null,
  });

  /* ------------------------------ / navigation ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <ScreenView style={{ justifyContent: 'space-between' }}>
      {!!user ? <UserSection user={user} signOut={signOut} /> : <SignForm signIn={signIn} signUp={signUp} />}

      <UI.Layout.Divider margin={0} />

      <LinksSection
        isAuth={isAuth}
        isAdmin={isAdmin}
        navToUsers={navToUsers}
        navToColorPalette={navToColorPalette}
        navToAsyncStorage={navToAsyncStorage}
      />
    </ScreenView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'Account'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
