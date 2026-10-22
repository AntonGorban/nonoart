import { Card, Flex, Segmented } from 'antd';
import React from 'react';

import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

import type { DAL } from '@nono-art/dal';

import type { SignFlag } from '../hooks';
import { useForm } from '../hooks';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const SignForm = React.memo<Props>(({ signIn, signUp }) => {
  const { signFlag, data, changeSignFlag, signIn: signInProps, signUp: signUpProps } = useForm(signIn, signUp);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <Flex align="center" justify="center">
      <Card style={{ width: '100%', maxWidth: 600 }}>
        <Flex orientation="vertical" gap="middle" style={{ width: '100%' }}>
          <Segmented
            block
            value={signFlag}
            onChange={(value) => changeSignFlag(value as SignFlag)}
            options={[
              { value: 'signIn', label: 'Вход', icon: <LoginOutlined /> },
              { value: 'signUp', label: 'Регистрация', icon: <UserAddOutlined /> },
            ]}
          />

          {signFlag === 'signIn' ? (
            <SignInForm
              login={data.login}
              password={data.password}
              changeLogin={data.changeLogin}
              changePassword={data.changePassword}
              isLoading={signInProps.isLoading}
              error={signInProps.error}
              submit={signInProps.submit}
            />
          ) : (
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
        </Flex>
      </Card>
    </Flex>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly signIn: DAL.user.auth.SignIn;
  readonly signUp: DAL.user.auth.SignUp;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
