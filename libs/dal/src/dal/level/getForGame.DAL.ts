import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import type { D } from '@nono-art/domain';

import { useApiDictionary } from '../../hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useDAL = (disableSafetyMode: boolean) => {
  /* ----------------------------- response config ---------------------------- */

  const { api } = useApiDictionary();

  const key = useMemo(() => `/level/gor-game?${JSON.stringify({ disableSafetyMode })}`, [disableSafetyMode]);

  const fetcher = useCallback(
    async () => api.level.getForGame({}, { disableSafetyMode }, {}).then((res) => prepareResponse(res.data)),
    [api.level, disableSafetyMode],
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

  /* --------------------------------- RETURN --------------------------------- */

  return { levels, error, isLoading, isValidating, refresh, mutate, count };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (data: Response): LevelList => data.map(prepareLevel);

const prepareLevel = ({ createdAt, updatedAt, ...level }: RLevel): Level => ({
  ...level,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt),
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type LevelList = ReadonlyArray<Level>;

export interface Level extends Omit<RLevel, 'createdAt' | 'updatedAt'> {
  readonly createdAt: D.Level.CreatedAt;
  readonly updatedAt: D.Level.UpdatedAt;
}

/* -------------------------------------------------------------------------- */

export type RLevel = Response[number];

export type Response = REST.level.getForGame.R;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
