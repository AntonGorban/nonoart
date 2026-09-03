import { createStore, type GlobalStore } from '@/services';

import type { StoreAuth } from './types';

/* -------------------------------------------------------------------------- */
/*                                    STORE                                   */
/* -------------------------------------------------------------------------- */

export const createAuthStore = () =>
  createStore<State>({
    auth: {
      user: null,
      accessToken: null,
      refreshToken: null,
    },
    isLoading: false,
    isValidating: false,
  });

/* -------------------------------------------------------------------------- */

export interface State {
  readonly auth: StoreAuth;
  readonly isLoading: boolean;
  readonly isValidating: boolean;
}

export type Store = GlobalStore<State>;

/* -------------------------------------------------------------------------- */
/*                                   / STORE                                  */
/* -------------------------------------------------------------------------- */
