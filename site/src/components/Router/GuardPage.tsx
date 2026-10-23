import { Flex, Spin } from 'antd';
import React from 'react';
import { Navigate } from 'react-router';

import { DAL } from '@nono-art/dal';

import { type RouteAccess, signInPath } from '../../config';
import { ForbiddenPage } from '../../pages/Forbidden';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const GuardPage = React.memo<Props>(({ access, children }) => {
  const { isAuth, userRole, isLoading } = DAL.user.auth.useDAL();

  const requiresAuth = !!access?.isPrivate || !!access?.roleList;

  /* --------------------------------- RETURN --------------------------------- */

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (requiresAuth && !isAuth) return <Navigate to={signInPath} replace />;

  if (!!access?.roleList?.length && (!userRole || !access.roleList.includes(userRole))) return <ForbiddenPage />;

  return <>{children}</>;
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly access?: RouteAccess;
  readonly children: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
