import { Avatar, Button, Flex, Tooltip, Typography } from 'antd';
import React from 'react';

import { LogoutOutlined } from '@ant-design/icons';

import type { DAL } from '@nono-art/dal';

import { IdTag } from '../../../components/IdTag';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserSection = React.memo<Props>(({ user, signOut }) => (
  <Flex align="center" justify="space-between" gap="small" style={{ width: '100%' }}>
    <Flex align="center" gap="small">
      <Avatar style={{ backgroundColor: '#1677ff' }}>{user.login.substring(0, 1).toUpperCase()}</Avatar>

      <Flex orientation="vertical">
        <Typography.Text strong>{user.login}</Typography.Text>

        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {user.role}
        </Typography.Text>
      </Flex>
    </Flex>

    <Flex align="center" gap="small">
      <IdTag id={user.id} />

      <Tooltip title="Выйти">
        <Button icon={<LogoutOutlined />} onClick={signOut} danger />
      </Tooltip>
    </Flex>
  </Flex>
));

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly user: DAL.user.auth.User;
  readonly signOut: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
