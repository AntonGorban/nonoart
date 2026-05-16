import { useCallback, useMemo } from 'react';

import { D } from '@nono-art/domain';

import { useAppSelector } from '../../hooks';

import { selectors, type Selectors } from './levels.slice';
import type { Level, LevelList } from './levels.state';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useLevelsSelectors = (): LevelsSelectors => {
  /* -------------------------------- selectors ------------------------------- */

  const rawLevelList = useAppSelector(selectors.rawLevelList);

  /* ------------------------------- / selectors ------------------------------ */

  /* ---------------------------- custom selectors ---------------------------- */

  const levelList = useMemo<LevelList>(
    () =>
      rawLevelList.map((level) => ({
        ...level,
        gridWidth: D.utils.level.calcGridWidth(level.grid),
        gridHeight: D.utils.level.calcGridHeight(level.grid),
        complexity: D.utils.level.calcArtComplexity(level.grid),
      })),
    [rawLevelList],
  );

  const getLevelById = useCallback<GetLevelById>(
    (id) => levelList.find((level) => level.id === id) || null,
    [levelList],
  );

  const getLevelByIdx = useCallback<GetLevelByIdx>((idx) => levelList[idx] || null, [levelList]);

  /* --------------------------- / custom selectors --------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return {
    rawLevelList,
    levelList,
    getLevelById,
    getLevelByIdx,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface LevelsSelectors extends Selectors {
  readonly levelList: LevelList;
  readonly getLevelById: GetLevelById;
  readonly getLevelByIdx: GetLevelByIdx;
}

/* -------------------------------------------------------------------------- */

export type GetLevelById = (id: string) => Level | null;
export type GetLevelByIdx = (idx: number) => Level | null;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
