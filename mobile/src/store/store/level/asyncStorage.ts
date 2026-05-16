import AsyncStorage from '@react-native-async-storage/async-storage';

import { D } from '@nono-art/domain';

import type { StoreLevel } from './types';
import { createNewProgress, deserialize, getAsyncStorageKey, normalize, parse, serialize, stringify } from './utils';

/* -------------------------------------------------------------------------- */
/*                                ASYNC STORAGE                               */
/* -------------------------------------------------------------------------- */

export const get = async (id: D.Level.Id): Promise<StoreLevel | null> => {
  const key = getAsyncStorageKey(id);

  const stringifiedLevel = await AsyncStorage.getItem(key);

  if (!stringifiedLevel) return null;

  try {
    let rawLevel = normalize(parse(stringifiedLevel));

    const gridWidth = D.utils.level.calcGridWidth(rawLevel.grid);
    const gridHeight = D.utils.level.calcGridHeight(rawLevel.grid);

    if (rawLevel.status === D.Level.Status.new) {
      rawLevel = { ...rawLevel, progress: rawLevel.grid };
      set(rawLevel.id, deserialize(rawLevel));
    } else {
      const progressWidth = D.utils.level.calcGridWidth(rawLevel.progress);
      const progressHeight = D.utils.level.calcGridHeight(rawLevel.progress);

      if (progressWidth !== gridWidth || progressHeight !== gridHeight) {
        rawLevel = { ...rawLevel, progress: createNewProgress(gridWidth, gridHeight) };
        set(rawLevel.id, deserialize(rawLevel));
      }
    }

    if (rawLevel.id !== id) throw new Error('bad level id (id !== id)');

    const level = deserialize(rawLevel);

    return level;
  } catch (error) {
    console.warn(error);
    AsyncStorage.removeItem(key);
    return null;
  }
};

/* -------------------------------------------------------------------------- */

export const set = (id: D.Level.Id, level: StoreLevel): Promise<void> => {
  const key = getAsyncStorageKey(id);

  return AsyncStorage.setItem(key, stringify(serialize(level)));
};

/* -------------------------------------------------------------------------- */
/*                               / ASYNC STORAGE                              */
/* -------------------------------------------------------------------------- */
