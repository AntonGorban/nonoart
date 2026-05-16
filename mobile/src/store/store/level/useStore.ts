import { useCallback } from 'react';

import type { D } from '@nono-art/domain';

import type { StoreLevel } from './types';
import { useStoreData } from './useStoreData';
import { useStoreSelectors } from './useStoreSelectors';
import { useStoreSetters } from './useStoreSetters';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStore = (queryLevelId: D.Level.Id) => {
  const {
    level: rawLevel,
    isLoading,
    isValidating,
    error,
    setLevel: rawSetLevel,
    refresh,
  } = useStoreData(queryLevelId);

  const { level, gridWidth, gridHeight } = useStoreSelectors(rawLevel);

  const setLevel = useCallback(
    (fn: (prev: StoreLevel) => StoreLevel) => rawSetLevel((p) => (!!p ? fn(p) : p)),
    [rawSetLevel],
  );

  const setters = useStoreSetters(setLevel, gridWidth, gridHeight);

  /* --------------------------------- RETURN --------------------------------- */

  return { level, isLoading, isValidating, error, refresh, ...setters, setLevel };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
