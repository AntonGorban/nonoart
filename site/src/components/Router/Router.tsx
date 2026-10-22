import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import type { RouteList } from '../../config';

import { GuardPage } from './GuardPage';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Router = React.memo<Props>(({ routeList, __isRootRouter = true }) => {
  return (
    <Routes>
      {routeList.map(({ path, Page, subRouteList, access }) => (
        <>
          {!!Page && (
            <Route
              key={path}
              path={path}
              element={
                <GuardPage access={access}>
                  <Page />
                </GuardPage>
              }
            />
          )}

          {!!subRouteList && (
            <Route
              key={path + '/*'}
              path={path + '/*'}
              element={<Router routeList={subRouteList} __isRootRouter={false} />}
            />
          )}
        </>
      ))}

      {!!__isRootRouter && <Route path="*" element={<Navigate to={'/'} replace />} />}
    </Routes>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly routeList: RouteList;
  readonly __isRootRouter?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
