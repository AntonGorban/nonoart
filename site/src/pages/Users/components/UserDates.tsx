import { Alert, Flex, Spin, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import type { D } from '@nono-art/domain';
import { f } from '@nono-art/utils';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserDates = React.memo<Props>(({ id }) => {
  const { error, isLoading, user } = DAL.user.getVerbose.useDAL(id);

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

  return (
    <Flex orientation="vertical" gap="small">
      <Typography.Text>{f.dateFormat.format(user.createdAt)}</Typography.Text>

      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        изменён {f.dateFormat.format(user.updatedAt)}
      </Typography.Text>
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
  readonly id: D.User.Id;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
