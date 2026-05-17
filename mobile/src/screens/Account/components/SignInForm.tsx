import React, { type ComponentProps } from 'react';
import { View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';

import { UI } from '@nono-art/ui-mobile';

import { LoginInput } from './LoginInput';
import { PasswordInput } from './PasswordInput';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const SignInForm = React.memo<Props>(
  ({ login, password, changeLogin, changePassword, isLoading, error, submit }) => {
    return (
      <View style={{ gap: 8 }}>
        <LoginInput login={login} changeLogin={changeLogin} />

        <PasswordInput password={password} changePassword={changePassword} />

        <UI.Layout.Divider margin={0} />

        <View>
          <Button
            icon="login"
            mode="contained"
            rippleColor={UI.color.primary}
            onPress={submit}
            loading={isLoading}
            disabled={isLoading}
          >
            Войти
          </Button>

          <HelperText type="error" visible={!!error} style={{ textAlign: 'center' }}>
            {error}
          </HelperText>
        </View>
      </View>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type LoginInputProps = ComponentProps<typeof LoginInput>;
type PasswordInputProps = ComponentProps<typeof PasswordInput>;

/* -------------------------------------------------------------------------- */

interface Props extends LoginInputProps, PasswordInputProps {
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly submit: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
