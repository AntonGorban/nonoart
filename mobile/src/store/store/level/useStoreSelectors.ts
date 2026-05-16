import { useMemo } from 'react';

import { D } from '@nono-art/domain';

import type { Level, StoreLevel } from './types';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreSelectors = (rawLevel: StoreLevel | null) => {
  const grid = useMemo<D.Level.Grid | null>(() => rawLevel?.grid ?? null, [rawLevel?.grid]);

  const gridWidth = useMemo(() => (!!grid ? D.utils.level.calcGridWidth(grid) : 1), [grid]);
  const gridHeight = useMemo(() => (!!grid ? D.utils.level.calcGridHeight(grid) : 1), [grid]);
  const complexity = useMemo(() => (!!grid ? D.utils.level.calcArtComplexity(grid) : 1), [grid]);

  const level: Level | null = useMemo(
    () => (!!rawLevel ? { ...rawLevel, gridWidth, gridHeight, complexity } : rawLevel),
    [complexity, gridHeight, gridWidth, rawLevel],
  );

  return { level, gridWidth, gridHeight };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
