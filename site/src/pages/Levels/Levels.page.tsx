import { Alert, Button, Divider, Empty, Flex, Spin, Statistic, Table, Tag, Tooltip, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';
import { D } from '@nono-art/domain';
import { f } from '@nono-art/utils';

import { Guard, MultilineText } from '../../components';

import { CreateLevelForm } from './components/CreateLevelForm';
import { LevelGridPreview } from './components/LevelGridPreview';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelsPage: React.FC<Props> = () => {
  const { create, error, isLoading, isValidating, levels, count, refresh } = DAL.level.get.useDAL();

  return (
    <Flex orientation="vertical" gap="medium">
      <Typography.Title>Уровни</Typography.Title>

      <Divider size="small" />

      <Flex orientation="horizontal" gap="small" justify="space-evenly" align="center">
        <Statistic title="Кол-во уровней" value={count} loading={isLoading} />

        <Guard>
          <CreateLevelForm create={create} />
        </Guard>

        <Button onClick={refresh} loading={isLoading || isValidating} disabled={isLoading || isValidating}>
          Обновить
        </Button>
      </Flex>

      <Divider size="small" />

      {isLoading && <Spin fullscreen size="large" />}

      {!!levels &&
        (levels.length ? (
          <Table
            columns={[
              {
                title: 'Превью',
                key: 'preview',
                width: 150,
                render: (_, level) => <LevelGridPreview grid={level.grid} colors={level.colors} />,
              },
              {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name, 'ru'),
                render: (_, level) => (
                  <Flex orientation="vertical" gap="small">
                    <Flex orientation="horizontal" gap="small" align="center">
                      <Typography.Text strong delete={!!level.deletedAt}>
                        {level.name}
                      </Typography.Text>

                      {!!level.deletedAt && <Tag color="red">Удалён</Tag>}
                    </Flex>

                    {!!level.description && (
                      <Typography.Text type="secondary" style={{ whiteSpace: 'pre-line' }}>
                        <MultilineText>{level.description}</MultilineText>
                      </Typography.Text>
                    )}
                  </Flex>
                ),
              },
              {
                title: 'Цвета',
                key: 'colors',
                width: 110,
                render: (_, level) => (
                  <Flex orientation="horizontal" gap={4} align="center">
                    {level.colors.map((color, index) => (
                      <Tooltip key={`${level.id}:${index}`} title={color}>
                        <span
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            background: color,
                            border: '1px solid rgba(5, 5, 5, 0.15)',
                            display: 'inline-block',
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Flex>
                ),
              },
              {
                title: 'Размер',
                key: 'size',
                width: 90,
                render: (_, level) => (
                  <Typography.Text>
                    {D.utils.level.calcGridWidth(level.grid)} × {D.utils.level.calcGridHeight(level.grid)}
                  </Typography.Text>
                ),
              },
              {
                title: 'Сложность',
                key: 'complexity',
                width: 110,
                sorter: (a, b) => D.utils.level.calcArtComplexity(a.grid) - D.utils.level.calcArtComplexity(b.grid),
                render: (_, level) => <Typography.Text>{D.utils.level.calcArtComplexity(level.grid)}</Typography.Text>,
              },
              {
                title: 'Автор',
                dataIndex: 'authorId',
                key: 'authorId',
                width: 130,
                render: (authorId) =>
                  !!authorId ? (
                    <Typography.Text code copyable={{ text: authorId }} style={{ fontSize: 12 }}>
                      {authorId.slice(0, 8)}
                    </Typography.Text>
                  ) : (
                    <Typography.Text type="secondary">—</Typography.Text>
                  ),
              },
              {
                title: 'Создан',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 170,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                render: (_, level) => (
                  <Flex orientation="vertical" gap="small">
                    <Typography.Text>{f.dateFormat.format(level.createdAt)}</Typography.Text>

                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      изменён {f.dateFormat.format(level.updatedAt)}
                    </Typography.Text>
                  </Flex>
                ),
              },
            ]}
            dataSource={levels}
            rowKey="id"
            loading={isLoading}
            size="middle"
            locale={{ emptyText: 'Уровней пока нет' }}
            pagination={{
              hideOnSinglePage: true,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Всего: ${total}`,
            }}
            scroll={{ x: 860 }}
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
