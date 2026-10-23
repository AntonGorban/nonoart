import { Alert, Flex, Spin, Tag } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import { D } from '@nono-art/domain';

/* -------------------------------------------------------------------------- */
/*                                    CONST                                   */
/* -------------------------------------------------------------------------- */

const ROLE_META: Record<D.User.Role, { readonly color: string; readonly label: string }> = {
  [D.User.Role.user]: { color: 'blue', label: 'Пользователь' },
  [D.User.Role.moderator]: { color: 'gold', label: 'Модератор' },
  [D.User.Role.admin]: { color: 'red', label: 'Админ' },
};

/* -------------------------------------------------------------------------- */
/*                                 / CONST                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UserRole = React.memo<Props>(({ id }) => {
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

  const { color, label } = ROLE_META[user.role];

  return <Tag color={color}>{label}</Tag>;
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
