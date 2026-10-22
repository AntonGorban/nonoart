import { Alert, Button, Form, Input } from 'antd';
import React, { useId } from 'react';

import { UserAddOutlined } from '@ant-design/icons';

import type { ApiError } from '@nono-art/api';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const SignUpForm = React.memo<Props>(
  ({ login, password, changeLogin, changePassword, isLoading, error, submit }) => {
    const htmlLoginId = useId();
    const htmlPasswordId = useId();

    return (
      <Form layout="vertical" disabled={isLoading}>
        <Form.Item label="Логин" htmlFor={htmlLoginId}>
          <Input value={login} onChange={changeLogin} id={htmlLoginId} placeholder="Придумайте логин" />
        </Form.Item>

        <Form.Item label="Пароль" htmlFor={htmlPasswordId}>
          <Input.Password
            value={password}
            onChange={changePassword}
            id={htmlPasswordId}
            placeholder="Придумайте пароль"
          />
        </Form.Item>

        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={submit}
          loading={isLoading}
          disabled={isLoading}
          block
        >
          Зарегистрироваться
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
