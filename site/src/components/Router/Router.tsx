import React from 'react';
import { Route, Routes } from 'react-router';

import type { RouteList } from '../../config';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Router = React.memo<Props>(({ routeList }) => {
  return (
    <Routes>
      {routeList.map(({ path, Page, subRouteList }) => (
        <>
          {!!Page && <Route key={path} path={path} element={<Page />} />}

          {!!subRouteList && (
            <Route key={path + '/*'} path={path + '/*'} element={<Router routeList={subRouteList} />} />
          )}
        </>
      ))}
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
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
