import type { D } from '@nono-art/domain';

import type { Store } from './store';

/* -------------------------------------------------------------------------- */
/*                                  SINGLETON                                 */
/* -------------------------------------------------------------------------- */

const refMap = new Map<D.Level.Id, { key: { readonly levelId: D.Level.Id }; refList: Set<symbol> }>();

export const clearRefMap = (levelId: D.Level.Id, symbol: symbol) => {
  const ref = refMap.get(levelId);
  if (!!ref) {
    ref.refList.delete(symbol);
    if (ref.refList.size === 0) refMap.delete(levelId);
  }
};

/* -------------------------------------------------------------------------- */

const singletonCache = new WeakMap<{ readonly levelId: D.Level.Id }, Store>();

export const getOrCreateSingleton = (levelId: D.Level.Id, symbol: symbol, factory: () => Store): Store => {
  const ref = refMap.get(levelId);
  let key = ref?.key;

  if (!ref) {
    key = { levelId };
    refMap.set(levelId, { key, refList: new Set([symbol]) });
  } else {
    ref.refList.add(symbol);
    key = ref.key;
  }

  let instance = singletonCache.get(key);
  if (instance === undefined) {
    instance = factory();
    singletonCache.set(key, instance);
  }
  return instance;
};

/* -------------------------------------------------------------------------- */
/*                                 / SINGLETON                                */
/* -------------------------------------------------------------------------- */
