import { useMemo } from 'react';

import type { Auth, StoreAuth } from './types';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreSelectors = (rawAuth: StoreAuth) => {
  const complexity = useMemo(() => 1, []);

  const auth: Auth = useMemo(() => (!!rawAuth ? { ...rawAuth, complexity } : rawAuth), [complexity, rawAuth]);

  return { auth };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
