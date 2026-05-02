import React, { useCallback } from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Divider, ScreenView } from '@/components';

import type { RootStackParamList } from '../routes';

import { LinksSection } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const AccountScreen: React.FC<Props> = ({ navigation }) => {
  /* ---------------------------------- data ---------------------------------- */

  // const { isAuth, user, role, login, registration, exitAuth } = DAL.user.auth.useGet();

  // const isAdmin = useMemo(() => role === Role.admin, [role]);

  const isAuth = true;
  const isAdmin = true;

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

  /* ------------------------------ / navigation ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <ScreenView style={{ justifyContent: 'space-between' }}>
      {/* {!!user ? (
        <UserSection user={user} exitAuth={exitAuth} />
      ) : (
        <SignForm loginRequest={login} registrationRequest={registration} />
      )} */}

      <Divider />

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
