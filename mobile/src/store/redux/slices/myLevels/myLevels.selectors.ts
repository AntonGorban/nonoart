import { useCallback, useMemo } from 'react';

import { D } from '@nono-art/domain';

import { useAppSelector } from '../../hooks';

import { selectors, type Selectors } from './myLevels.slice';
import type { MyLevel, MyLevelList } from './myLevels.state';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useMyLevelsSelectors = (): MyLevelsSelectors => {
  /* -------------------------------- selectors ------------------------------- */

  const rawMyLevelList = useAppSelector(selectors.rawMyLevelList);

  /* ------------------------------- / selectors ------------------------------ */

  /* ---------------------------- custom selectors ---------------------------- */

  const myLevelList = useMemo<MyLevelList>(
    () =>
      rawMyLevelList.map((level) => ({
        ...level,
        gridWidth: D.utils.level.calcGridWidth(level.grid),
        gridHeight: D.utils.level.calcGridHeight(level.grid),
        complexity: D.utils.level.calcArtComplexity(level.grid),
        createdAt: new Date(level.createdAt),
      })),
    [rawMyLevelList],
  );

  const getMyLevelById = useCallback<GetMyLevelById>(
    (id) => myLevelList.find((level) => level.id === id) || null,
    [myLevelList],
  );

  const getMyLevelByIdx = useCallback<GetMyLevelByIdx>((idx) => myLevelList[idx] || null, [myLevelList]);

  /* --------------------------- / custom selectors --------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return {
    rawMyLevelList,
    myLevelList,
    getMyLevelById,
    getMyLevelByIdx,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export interface MyLevelsSelectors extends Selectors {
  readonly myLevelList: MyLevelList;
  readonly getMyLevelById: GetMyLevelById;
  readonly getMyLevelByIdx: GetMyLevelByIdx;
}

/* -------------------------------------------------------------------------- */

export type GetMyLevelById = (id: string) => MyLevel | null;
export type GetMyLevelByIdx = (idx: number) => MyLevel | null;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
