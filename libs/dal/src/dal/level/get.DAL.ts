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

  /* --------------------------------- RETURN --------------------------------- */

  return { levels, error, isLoading, isValidating, refresh, mutate };
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
