import type React from 'react';

import { HomeOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';

import { HomePage, LevelsPage, UsersPage } from '../pages';

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const routeList: RouteList = [
  {
    path: '',
    label: 'Home',
    Page: () => <HomePage />,
    icon: <HomeOutlined />,
  },
  {
    path: 'users',
    label: 'Users',
    Page: () => <UsersPage />,
    icon: <UserOutlined />,
  },
  {
    path: 'levels',
    label: 'Levels',
    Page: () => <LevelsPage />,
    icon: <ProductOutlined />,
  },
];

/* -------------------------------------------------------------------------- */
/*                                 / CONSTANTS                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type RouteList = ReadonlyArray<RouteItem>;

export interface RouteItem {
  readonly path: string;
  readonly label: string;
  readonly Page?: React.FC;
  readonly icon?: React.ReactNode;
  readonly subRouteList?: RouteList;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
