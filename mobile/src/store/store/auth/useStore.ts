import { useCallback } from 'react';

import type { StoreAuth } from './types';
import { useStoreData } from './useStoreData';
import { useStoreSelectors } from './useStoreSelectors';
import { useStoreSetters } from './useStoreSetters';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStore = () => {
  const { auth: rawAuth, isLoading, isValidating, error, setAuth: rawSetAuth, refresh } = useStoreData();

  const { auth } = useStoreSelectors(rawAuth);

  const setAuth = useCallback(
    (fn: (prev: StoreAuth) => StoreAuth) => rawSetAuth((p) => (!!p ? fn(p) : p)),
    [rawSetAuth],
  );

  const setters = useStoreSetters(setAuth);

  /* --------------------------------- RETURN --------------------------------- */

  return { auth, isLoading, isValidating, error, refresh, ...setters, setAuth };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
