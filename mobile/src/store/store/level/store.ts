import { createStore, type GlobalStore } from '@/services';

import type { StoreLevel } from './types';

/* -------------------------------------------------------------------------- */
/*                                    STORE                                   */
/* -------------------------------------------------------------------------- */

export const createLevelStore = () =>
  createStore<State>({
    level: null,
    isLoading: false,
    isValidating: false,
  });

/* -------------------------------------------------------------------------- */

export interface State {
  readonly level: StoreLevel | null;
  readonly isLoading: boolean;
  readonly isValidating: boolean;
}

export type Store = GlobalStore<State>;

/* -------------------------------------------------------------------------- */
/*                                   / STORE                                  */
/* -------------------------------------------------------------------------- */
