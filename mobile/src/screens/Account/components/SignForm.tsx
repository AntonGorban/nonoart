import React from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import type { DAL } from '@nono-art/dal';
import { UI } from '@nono-art/ui-mobile';

import { useForm } from '../hooks';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const SignForm = React.memo<Props>(({ signIn, signUp }) => {
  const { signFlag, data, changeSignFlag, signUp: signUpProps, signIn: signInProps } = useForm(signIn, signUp);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <View style={{ width: '100%', gap: 8 }}>
      <SegmentedButtons
        value={signFlag}
        onValueChange={changeSignFlag}
        buttons={[
          { value: 'signIn', label: 'Вход', icon: 'login' },
          { value: 'signUp', label: 'Регистрация', icon: 'account-plus-outline' },
        ]}
      />

      <UI.Layout.Divider margin={0} />

      {signFlag === 'signIn' && (
        <SignInForm
          login={data.login}
          password={data.password}
          changeLogin={data.changeLogin}
          changePassword={data.changePassword}
          isLoading={signInProps.isLoading}
          error={signInProps.error}
          submit={signInProps.submit}
        />
      )}

      {signFlag === 'signUp' && (
        <SignUpForm
          login={data.login}
          password={data.password}
          changeLogin={data.changeLogin}
          changePassword={data.changePassword}
          isLoading={signUpProps.isLoading}
          error={signUpProps.error}
          submit={signUpProps.submit}
        />
      )}
    </View>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  signIn: DAL.user.auth.SignIn;
  signUp: DAL.user.auth.SignUp;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
