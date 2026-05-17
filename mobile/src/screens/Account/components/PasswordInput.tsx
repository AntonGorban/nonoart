import React from 'react';
import { TextInput } from 'react-native-paper';

import { useFlag } from '@nono-art/hooks';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const PasswordInput = React.memo<Props>(({ password, changePassword }) => {
  const [isHidePassword, { toggle: toggleIsHidePassword }] = useFlag(true);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <TextInput
      value={password}
      onChangeText={changePassword}
      keyboardType="default"
      label="Пароль"
      placeholder="Введите пароль"
      textContentType="password"
      secureTextEntry={isHidePassword}
      right={<TextInput.Icon onPress={toggleIsHidePassword} icon={isHidePassword ? 'eye-off' : 'eye'} />}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly password: string;
  readonly changePassword: (str: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
