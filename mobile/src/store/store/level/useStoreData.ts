import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import type { D } from '@nono-art/domain';
import { throttle } from '@nono-art/utils';

import { get, set } from './asyncStorage';
import { clearRefMap, getOrCreateSingleton } from './singleton';
import { createLevelStore, type State } from './store';
import type { StoreLevel } from './types';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreData = (levelId: D.Level.Id) => {
  /* ---------------------------------- store --------------------------------- */

  const storeRef = useRef<symbol>(Symbol('storeRef'));
  useEffect(
    () => () => {
      clearRefMap(levelId, storeRef.current);
    },
    [levelId],
  );

  const { getState, setState, subscribe } = useMemo(() => {
    return getOrCreateSingleton(levelId, storeRef.current, createLevelStore);
  }, [levelId]);

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

  const getLevel = useCallback(async () => {
    setError(null);
    enableIsValidating();
    try {
      const level = await get(levelId);
      setState((p) => ({ ...p, level }));
    } catch (error) {
      setState((p) => ({ ...p, level: null }));
      setError(error);
    } finally {
      disableIsValidating();
    }
  }, [disableIsValidating, enableIsValidating, levelId, setState]);

  const loadLevel = useCallback(async () => {
    enableIsLoading();
    await getLevel();
    disableIsLoading();
  }, [disableIsLoading, enableIsLoading, getLevel]);

  useEffect(() => {
    loadLevel();
  }, [loadLevel]);

  const refresh = useCallback(async () => {
    await getLevel();
  }, [getLevel]);

  /* --------------------------------- / load --------------------------------- */

  /* -------------------------------- throttle -------------------------------- */

  const throttledSave = useMemo(
    () =>
      throttle((levelToSave: StoreLevel) => {
        set(levelToSave.id, levelToSave);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => throttledSave.cancel();
  }, [throttledSave]);

  /* ------------------------------- / throttle ------------------------------- */

  const setLevel = useCallback(
    (fn: (prev: StoreLevel | null) => StoreLevel | null) => {
      setState((p) => {
        const level = fn(p.level);
        if (!!level) throttledSave(level);
        return { ...p, level };
      });
    },
    [setState, throttledSave],
  );

  const level = useMemo(() => state.level, [state.level]);
  const isLoading = useMemo(() => state.isLoading, [state.isLoading]);
  const isValidating = useMemo(() => state.isValidating, [state.isValidating]);

  /* --------------------------------- RETURN --------------------------------- */

  return { level, isLoading, isValidating, error, setLevel, refresh };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
