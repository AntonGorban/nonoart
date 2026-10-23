import { Alert, Flex, Spin, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import type { D } from '@nono-art/domain';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserLevelsCount = React.memo<Props>(({ id }) => {
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

  return <Typography.Text strong>{user.authorLevelsCount}</Typography.Text>;
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
