import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import type { D } from '@nono-art/domain';

import { useApiDictionary } from '../../hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useDAL = (id: D.User.Id) => {
  /* ----------------------------- response config ---------------------------- */

  const { api } = useApiDictionary();

  const key = useMemo(() => `/user/${id}/verbose`, [id]);

  const fetcher = useCallback(
    async () => api.user.getVerbose({ id }, {}, {}).then((res) => prepareResponse(res.data)),
    [api.user, id],
  );

  /* ---------------------------- / response config --------------------------- */

  /* ---------------------------------- fetch --------------------------------- */

  const { data: user, error: rawError, isLoading, isValidating, mutate } = useSWR<User>(key, fetcher);

  const error = useMemo<ApiError | null>(() => (!!rawError ? getApiError(rawError) : null), [rawError]);

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);

  /* --------------------------------- / fetch -------------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return { user, error, isLoading, isValidating, refresh, mutate };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = ({ createdAt, updatedAt, deletedAt, ...data }: Response): User => ({
  ...data,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt),
  deletedAt: !!deletedAt ? new Date(deletedAt) : null,
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface User extends Omit<Response, 'createdAt' | 'updatedAt' | 'deletedAt'> {
  readonly createdAt: D.User.CreatedAt;
  readonly updatedAt: D.User.UpdatedAt;
  readonly deletedAt: D.User.DeletedAt;
}

/* -------------------------------------------------------------------------- */

export type Response = REST.user.getVerbose.R;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
