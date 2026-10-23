import { Alert, Avatar, Button, Divider, Empty, Flex, Spin, Statistic, Table, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';

import { IdTag } from '../../components/IdTag';

import { UserDates } from './components/UserDates';
import { UserLevelsCount } from './components/UserLevelsCount';
import { UserRole } from './components/UserRole';
import { UserStatus } from './components/UserStatus';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const UsersPage: React.FC<Props> = () => {
  const { error, isLoading, isValidating, users, count, refresh } = DAL.user.getAll.useDAL();

  return (
    <Flex orientation="vertical" gap="medium">
      <Typography.Title>Пользователи</Typography.Title>

      <Divider size="small" />

      <Flex orientation="horizontal" gap="small" justify="space-evenly" align="center">
        <Statistic title="Кол-во пользователей" value={count} loading={isLoading} />

        <Button onClick={refresh} loading={isLoading || isValidating} disabled={isLoading || isValidating}>
          Обновить
        </Button>
      </Flex>

      <Divider size="small" />

      {isLoading && <Spin fullscreen size="large" />}

      {!!users &&
        (users.length ? (
          <Table
            columns={[
              {
                title: 'Пользователь',
                dataIndex: 'login',
                key: 'login',
                width: 190,
                sorter: (a, b) => a.login.localeCompare(b.login, 'ru'),
                render: (_, user) => (
                  <Flex orientation="vertical" gap="small">
                    <Flex orientation="horizontal" gap="small" align="center">
                      <Avatar style={{ backgroundColor: '#1677ff', flexShrink: 0 }}>
                        {user.login.charAt(0).toUpperCase()}
                      </Avatar>

                      <Typography.Text strong>{user.login}</Typography.Text>
                    </Flex>

                    <IdTag id={user.id} />
                  </Flex>
                ),
              },
              {
                title: 'Роль',
                key: 'role',
                width: 130,
                render: (_, user) => <UserRole id={user.id} />,
              },
              {
                title: 'Создано уровней',
                key: 'authorLevelsCount',
                width: 130,
                align: 'center',
                render: (_, user) => <UserLevelsCount id={user.id} />,
              },
              {
                title: 'Создан',
                key: 'createdAt',
                width: 170,
                render: (_, user) => <UserDates id={user.id} />,
              },
              {
                title: 'Статус',
                key: 'status',
                width: 100,
                render: (_, user) => <UserStatus id={user.id} />,
              },
            ]}
            dataSource={users}
            rowKey="id"
            loading={isLoading}
            size="middle"
            locale={{ emptyText: 'Пользователей пока нет' }}
            pagination={{
              hideOnSinglePage: true,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Всего: ${total}`,
            }}
            scroll={{ x: 720 }}
          />
        ) : (
          <Empty />
        ))}

      {!!error && <Alert title="Ошибка" description={error.message} type="error" showIcon />}
    </Flex>
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
