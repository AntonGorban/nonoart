import { Layout as AntdLayout, Flex, Typography } from 'antd';
import React, { useCallback } from 'react';

import { useFlag } from '@nono-art/hooks';

import { routeList } from '../../config/routes';

import { Menu } from './Menu';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Layout = React.memo<Props>(({ children, title }) => {
  const [collapsed, { set: setCollapsed }] = useFlag(false);

  const changeCollapsed = useCallback(
    (flag: boolean) => {
      setCollapsed(flag);
    },
    [setCollapsed],
  );

  const currentYear = new Date().getFullYear();

  return (
    <>
      <AntdLayout style={{ minHeight: '100vh' }}>
        <AntdLayout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={changeCollapsed}
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
          <Flex style={{ padding: 'min(1vh, 1vw) 0' }}>
            <Menu routeList={routeList} />
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
