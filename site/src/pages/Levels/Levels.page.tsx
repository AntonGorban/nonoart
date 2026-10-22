import { Alert, Button, Divider, Empty, Flex, Spin, Statistic, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelsPage: React.FC<Props> = () => {
  const { error, isLoading, isValidating, levels, count, refresh } = DAL.level.get.useDAL();

  return (
    <Flex orientation="vertical" gap="medium">
      <Typography.Title>Уровни</Typography.Title>

      <Divider size="small" />

      <Flex orientation="horizontal" gap="small" justify="space-evenly" align="center">
        <Statistic title="Кол-во уровней" value={count} loading={isLoading} />

        <Button onClick={refresh} loading={isLoading || isValidating} disabled={isLoading || isValidating}>
          Обновить
        </Button>
      </Flex>

      <Divider size="small" />

      {isLoading && <Spin fullscreen size="large" />}

      {!!levels && (levels.length ? <pre>{JSON.stringify(levels, null, 2)}</pre> : <Empty />)}

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
