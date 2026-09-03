import type { Store } from './store';

/* -------------------------------------------------------------------------- */
/*                                  SINGLETON                                 */
/* -------------------------------------------------------------------------- */

let singleton: Store | null = null;

export const getOrCreateSingleton = (factory: () => Store): Store => {
  if (!singleton) {
    singleton = factory();
  }

  return singleton;
};

/* -------------------------------------------------------------------------- */
/*                                 / SINGLETON                                */
/* -------------------------------------------------------------------------- */
