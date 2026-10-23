import { Alert, Flex, Spin, Tag } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import type { D } from '@nono-art/domain';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserStatus = React.memo<Props>(({ id }) => {
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

  if (!!user.deletedAt) {
    return <Tag color="red">Удалён</Tag>;
  }

  return <Tag color="green">Активен</Tag>;
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
