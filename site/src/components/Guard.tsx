import { Spin } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import type { D } from '@nono-art/domain';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Guard = React.memo<Props>(({ roles, children }) => {
  const { isAuth, userRole, isLoading } = DAL.user.auth.useDAL();

  /* --------------------------------- RETURN --------------------------------- */

  if (isLoading) {
    return <Spin size="small" />;
  }

  if (!isAuth) return null;

  if (!!roles && !roles.includes(userRole)) return null;

  return <>{children}</>;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly roles?: ReadonlyArray<D.User.Role | null>;
  readonly children: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
