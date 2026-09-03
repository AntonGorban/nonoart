import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import type { D } from '@nono-art/domain';
import { throttle } from '@nono-art/utils';

import { get, set } from './asyncStorage';
import { getOrCreateSingleton } from './singleton';
import { createAuthStore, type State } from './store';
import type { StoreAuth } from './types';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreData = () => {
  /* ---------------------------------- store --------------------------------- */

  const { getState, setState, subscribe } = useMemo(() => {
    return getOrCreateSingleton(createAuthStore);
  }, []);

  /* --------------------------------- / store -------------------------------- */

  /* ---------------------------------- state --------------------------------- */

  const state: State = useSyncExternalStore(subscribe, () => getState());

  const [error, setError] = useState<unknown | null>(null);

  /* --------------------------------- / state -------------------------------- */

  /* ---------------------------------- load ---------------------------------- */

  const enableIsLoading = useCallback(() => setState((p) => ({ ...p, isLoading: true })), [setState]);
  const disableIsLoading = useCallback(() => setState((p) => ({ ...p, isLoading: false })), [setState]);
  const enableIsValidating = useCallback(() => setState((p) => ({ ...p, isValidating: true })), [setState]);
  const disableIsValidating = useCallback(() => setState((p) => ({ ...p, isValidating: false })), [setState]);

  const getAuth = useCallback(async () => {
    setError(null);
    enableIsValidating();
    try {
      const auth = await get();
      if (!!auth)
        setState((p) => ({
          ...p,
          auth: {
            ...p.auth,
            ...auth,
            user: !!auth.user
              ? !!p.auth.user
                ? { ...p.auth.user, ...auth.user }
                : auth.user
              : !!p.auth.user
                ? p.auth.user
                : null,
          },
        }));
    } catch (error) {
      setError(error);
    } finally {
      disableIsValidating();
    }
  }, [disableIsValidating, enableIsValidating, setState]);

  const loadAuth = useCallback(async () => {
    enableIsLoading();
    await getAuth();
    disableIsLoading();
  }, [disableIsLoading, enableIsLoading, getAuth]);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  const refresh = useCallback(async () => {
    await getAuth();
  }, [getAuth]);

  /* --------------------------------- / load --------------------------------- */

  /* -------------------------------- throttle -------------------------------- */

  const throttledSave = useMemo(
    () =>
      throttle((authToSave: StoreAuth) => {
        set(authToSave);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => throttledSave.cancel();
  }, [throttledSave]);

  /* ------------------------------- / throttle ------------------------------- */

  const setAuth = useCallback(
    (fn: (prev: StoreAuth) => StoreAuth) => {
      setState((p) => {
        const auth = fn(p.auth);
        if (!!auth) throttledSave(auth);
        return { ...p, auth };
      });
    },
    [setState, throttledSave],
  );

  const auth = useMemo(() => state.auth, [state.auth]);
  const isLoading = useMemo(() => state.isLoading, [state.isLoading]);
  const isValidating = useMemo(() => state.isValidating, [state.isValidating]);

  /* --------------------------------- RETURN --------------------------------- */

  return { auth, isLoading, isValidating, error, setAuth, refresh };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
