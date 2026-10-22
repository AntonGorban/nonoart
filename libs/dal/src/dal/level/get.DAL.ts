import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import type { D } from '@nono-art/domain';

import { useApiDictionary } from '../../hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useDAL = () => {
  /* ----------------------------- response config ---------------------------- */

  const { api } = useApiDictionary();

  const key = useMemo(() => '/level', []);

  const fetcher = useCallback(
    async () => api.level.get({}, {}, {}).then((res) => prepareResponse(res.data)),
    [api.level],
  );

  /* ---------------------------- / response config --------------------------- */

  /* ---------------------------------- fetch --------------------------------- */

  const { data: levels, error: rawError, isLoading, isValidating, mutate } = useSWR<LevelList>(key, fetcher);

  const error = useMemo<ApiError | null>(() => (!!rawError ? getApiError(rawError) : null), [rawError]);

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);

  /* --------------------------------- / fetch -------------------------------- */

  /* -------------------------------- selectors ------------------------------- */

  const count: number = levels?.length ?? 0;

  /* ------------------------------- / selectors ------------------------------ */

  /* -------------------------------- mutations ------------------------------- */

  const create = useCallback(
    async (...args: Parameters<typeof api.level.create>) => {
      const res = await api.level.create(...args);
      mutate((p) =>
        !!p
          ? p.map(({ ...level }) => ({
              ...level,
              ...res.data,
              createdAt: new Date(res.data.createdAt),
              updatedAt: new Date(res.data.updatedAt),
              deletedAt: !!res.data.deletedAt ? new Date(res.data.deletedAt) : null,
            }))
          : p,
      ).catch(console.error);
      return res;
    },
    [api, mutate],
  );

  /* ------------------------------- / mutations ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return { levels, error, isLoading, isValidating, refresh, mutate, count, create };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (data: Response): LevelList => data.map(prepareLevel);

const prepareLevel = ({ createdAt, updatedAt, deletedAt, ...level }: RLevel): Level => ({
  ...level,
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

export type LevelList = ReadonlyArray<Level>;

export interface Level extends Omit<RLevel, 'createdAt' | 'updatedAt' | 'deletedAt'> {
  readonly createdAt: D.Level.CreatedAt;
  readonly updatedAt: D.Level.UpdatedAt;
  readonly deletedAt: D.Level.DeletedAt;
}

/* -------------------------------------------------------------------------- */

export type RLevel = Response[number];

export type Response = REST.level.get.R;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
