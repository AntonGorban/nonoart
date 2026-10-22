import { Alert, Button, Form, Input } from 'antd';
import React, { useId } from 'react';

import { LoginOutlined } from '@ant-design/icons';

import type { ApiError } from '@nono-art/api';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const SignInForm = React.memo<Props>(
  ({ login, password, changeLogin, changePassword, isLoading, error, submit }) => {
    const htmlLoginId = useId();
    const htmlPasswordId = useId();

    return (
      <Form layout="vertical" disabled={isLoading}>
        <Form.Item label="Логин" htmlFor={htmlLoginId}>
          <Input value={login} onChange={changeLogin} id={htmlLoginId} placeholder="Введите логин" />
        </Form.Item>

        <Form.Item label="Пароль" htmlFor={htmlPasswordId}>
          <Input.Password value={password} onChange={changePassword} id={htmlPasswordId} placeholder="Введите пароль" />
        </Form.Item>

        <Button type="primary" icon={<LoginOutlined />} onClick={submit} loading={isLoading} disabled={isLoading} block>
          Войти
        </Button>

        {!!error && <Alert title={error.message} type="error" showIcon style={{ marginTop: 8 }} />}
      </Form>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly login: string;
  readonly password: string;
  readonly changeLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly changePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly isLoading: boolean;
  readonly error: ApiError | null;
  readonly submit: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
