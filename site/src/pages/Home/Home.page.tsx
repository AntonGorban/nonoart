import { Divider, Flex, Typography } from 'antd';
import React from 'react';

import { DAL } from '@nono-art/dal';

import { SignForm, UserSection } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const HomePage: React.FC<Props> = () => {
  const { user, signIn, signUp, signOut } = DAL.user.auth.useDAL();

  /* --------------------------------- / data --------------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <Flex orientation="vertical" gap="small">
      <Typography.Title>Домашняя страница</Typography.Title>

      <Divider size="small" />

      {!!user ? <UserSection user={user} signOut={signOut} /> : <SignForm signIn={signIn} signUp={signUp} />}
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
