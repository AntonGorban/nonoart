import type React from 'react';

import { HomeOutlined, ProductOutlined, TeamOutlined } from '@ant-design/icons';

import { D } from '@nono-art/domain';

import { HomePage, LevelsPage, UsersPage } from '../pages';

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const signInPath = '/';

export const routeList: RouteList = [
  {
    path: '',
    label: 'Home',
    Page: () => <HomePage />,
    icon: <HomeOutlined />,
  },
  {
    path: 'levels',
    label: 'Levels',
    Page: () => <LevelsPage />,
    icon: <ProductOutlined />,
  },
  {
    path: 'users',
    label: 'Users',
    Page: () => <UsersPage />,
    icon: <TeamOutlined />,
    access: { isPrivate: true, roleList: [D.User.Role.admin] },
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
  readonly access?: RouteAccess;
}

export interface RouteAccess {
  /** страница доступна только аутентифицированным пользователям */
  readonly isPrivate?: boolean;
  /** страница дополнительно требует указанную роль (проверка роли после аутентификации) */
  readonly roleList?: ReadonlyArray<D.User.Role>;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
