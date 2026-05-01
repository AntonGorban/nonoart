import { Layout as AntdLayout, Flex, Menu, type MenuProps, Typography } from 'antd';
import React, { useState } from 'react';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const menu: MenuItemList = [
  {
    id: 'users',
    name: 'users',
    icon: <UserOutlined />,
  },
];

const prepareMenuItem = ({ id, name, icon, subMenu }: MenuItem): Required<MenuProps>['items'][number] => ({
  key: id,
  label: name,
  icon,
  ...(!!subMenu ? { children: subMenu.map(prepareMenuItem) } : {}),
});

type MenuItemList = ReadonlyArray<MenuItem>;

interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly icon?: React.ReactNode;
  readonly subMenu?: MenuItemList;
}

const menuItemList: Required<MenuProps>['items'] = menu.map(prepareMenuItem);

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Layout = React.memo<Props>(({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <AntdLayout style={{ minHeight: '100vh' }}>
        <AntdLayout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            insetInlineStart: 0,
            top: 0,
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
          }}
        >
          <Flex style={{ padding: 'min(1vh, 1vw)' }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                ...menuItemList,
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3',
                },
              ]}
            />
          </Flex>
        </AntdLayout.Sider>
        <AntdLayout>
          {!!title && (
            <AntdLayout.Header style={{ padding: 0 }}>
              {typeof title === 'string' ? (
                <Flex align="center" justify="flex-start" style={{ paddingLeft: 'min(1vh, 1vw)', height: '100%' }}>
                  <Typography.Title style={{ color: '#fefefe', padding: 0, margin: 0 }}>{title}</Typography.Title>
                </Flex>
              ) : (
                title
              )}
            </AntdLayout.Header>
          )}
          <AntdLayout.Content
            style={{
              padding: 'min(1vh, 1vw)',
            }}
          >
            {children}
          </AntdLayout.Content>

          <AntdLayout.Footer style={{ textAlign: 'center' }}>
            Ant Design ©{currentYear} Created by Ant UED
          </AntdLayout.Footer>
        </AntdLayout>
      </AntdLayout>
    </>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly children: React.ReactNode;
  readonly title?: string | React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
