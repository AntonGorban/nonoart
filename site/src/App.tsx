import { useCallback, useEffect, useState } from 'react';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import { DAL } from '@nono-art/dal';
import { useFlag, useIsLoadingFlag } from '@nono-art/hooks';
import { UI } from '@nono-art/ui-web';
import { uuidV4 } from '@nono-art/utils';

import './App.css';

import { Layout, Router } from './components';
import { routeList } from './config/routes';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const App: React.FC<Props> = () => {
  DAL.user.auth.useDAL();

  return (
    <Layout>
      <Router routeList={routeList} />
    </Layout>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
