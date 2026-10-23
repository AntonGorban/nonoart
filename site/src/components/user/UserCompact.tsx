import { Alert, Avatar, Flex, Spin, Tooltip, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import type { D } from '@nono-art/domain';

import { IdTag } from '../IdTag';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserCompact = React.memo<Props>(({ id, size = 'small', showId = false, tooltip = true }) => {
  const { error, isLoading, user } = DAL.user.getCompact.useDAL(id);

  if (isLoading) {
    return (
      <Flex align="center" justify="center">
        <Spin size="small" />
      </Flex>
    );
  }

  if (error || !user) {
    return <Alert title={error?.message ?? 'что-то пошло не так'} type="error" showIcon />;
  }

  const content = (
    <Flex orientation="vertical" align="center" gap="small" style={{ display: 'inline-flex' }}>
      <Flex orientation="horizontal" align="center" gap="small" style={{ display: 'inline-flex' }}>
        <Avatar size={size} style={{ backgroundColor: '#1677ff', flexShrink: 0 }}>
          {user.login.charAt(0).toUpperCase()}
        </Avatar>

        <Typography.Text>{user.login}</Typography.Text>
      </Flex>
      {showId && <IdTag id={user.id} />}
    </Flex>
  );

  if (!tooltip) {
    return content;
  }

  return <Tooltip title={user.id}>{content}</Tooltip>;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly id: D.User.Id;
  readonly size?: number | 'small' | 'default' | 'large';
  readonly showId?: boolean;
  readonly tooltip?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
