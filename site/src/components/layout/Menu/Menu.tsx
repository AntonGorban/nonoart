import { Menu as AntdMenu, type MenuProps } from 'antd';
import React, { useMemo } from 'react';
import { type NavigateFunction, useLocation, useNavigate } from 'react-router';

import type { RouteItem, RouteList } from '../../../config/routes';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Menu = React.memo<Props>(({ routeList }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItemList = useMemo(() => prepareMenuItemList(routeList, '', navigate), [navigate, routeList]);

  const selectedKeys = useMemo<Array<string>>(() => {
    if (location.pathname === '/') return ['/'];

    const foo = location.pathname.split('/').filter((item) => !!item);

    const res: Array<string> = [];
    let acc = '';

    foo.forEach((item) => {
      acc += '/' + item;
      res.push(acc);
    });

    return res;
  }, [location.pathname]);

  return (
    <AntdMenu
      style={{ width: '100%' }}
      defaultOpenKeys={selectedKeys}
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      theme="dark"
      mode="inline"
      items={menuItemList}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

const prepareMenuItemList = (routeList: RouteList, rootPath: string, navigate: NavigateFunction): MenuItemList =>
  routeList.map(prepareMenuItem(rootPath, navigate));

const prepareMenuItem =
  (rootPath: string, navigate: NavigateFunction) =>
  ({ path, label, Page, icon, subRouteList }: RouteItem): MenuItem => ({
    key: rootPath + '/' + path,
    label,
    icon,
    ...(subRouteList
      ? {
          type: 'submenu',
          children: prepareMenuItemList(subRouteList, rootPath + '/' + path, navigate),
          title: rootPath + '/' + path,
          ...(!!Page
            ? {
                onTitleClick: () => {
                  console.log(rootPath + '/' + path);
                  navigate(rootPath + '/' + path);
                },
              }
            : {}),
        }
      : {
          type: 'item',
          title: rootPath + '/' + path,
          ...(!!Page
            ? {
                onClick: () => {
                  console.log(rootPath + '/' + path);
                  navigate(rootPath + '/' + path);
                },
              }
            : {
                disabled: true,
              }),
        }),
  });

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly routeList: RouteList;
}

type MenuItemList = Array<MenuItem>;
type MenuItem = Required<MenuProps>['items'][number];

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
