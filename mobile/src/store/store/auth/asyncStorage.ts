import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StoreAuth } from './types';
import { deserialize, getAsyncStorageKey, normalize, parse, serialize, stringify } from './utils';

/* -------------------------------------------------------------------------- */
/*                                ASYNC STORAGE                               */
/* -------------------------------------------------------------------------- */

export const get = async (): Promise<StoreAuth | null> => {
  const key = getAsyncStorageKey();

  const stringifiedAuth = await AsyncStorage.getItem(key);

  if (!stringifiedAuth) return null;

  try {
    const auth = deserialize(normalize(parse(stringifiedAuth)));
    return auth;
  } catch (error) {
    console.warn(error);
    AsyncStorage.removeItem(key);
    return null;
  }
};

/* -------------------------------------------------------------------------- */

export const set = (auth: StoreAuth): Promise<void> => {
  const key = getAsyncStorageKey();

  return AsyncStorage.setItem(key, stringify(serialize(auth)));
};

/* -------------------------------------------------------------------------- */
/*                               / ASYNC STORAGE                              */
/* -------------------------------------------------------------------------- */
