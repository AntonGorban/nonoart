import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';

import { useApiDictionary } from '../../hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useDAL = () => {
  /* ----------------------------- response config ---------------------------- */

  const { api } = useApiDictionary();

  const key = useMemo(() => '/user', []);

  const fetcher = useCallback(
    async () => api.user.getAll({}, {}, {}).then((res) => prepareResponse(res.data)),
    [api.user],
  );

  /* ---------------------------- / response config --------------------------- */

  /* ---------------------------------- fetch --------------------------------- */

  const { data: users, error: rawError, isLoading, isValidating, mutate } = useSWR<UserList>(key, fetcher);

  const error = useMemo<ApiError | null>(() => (!!rawError ? getApiError(rawError) : null), [rawError]);

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);

  /* --------------------------------- / fetch -------------------------------- */

  /* -------------------------------- selectors ------------------------------- */

  const count: number = users?.length ?? 0;

  /* ------------------------------- / selectors ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return { users, error, isLoading, isValidating, refresh, mutate, count };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (data: Response): UserList => data.map(prepareUser);

const prepareUser = ({ ...data }: RUser): User => ({
  ...data,
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type UserList = ReadonlyArray<User>;

export interface User extends RUser {}

/* -------------------------------------------------------------------------- */

export type RUser = Response[number];

export type Response = REST.user.getAll.R;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
