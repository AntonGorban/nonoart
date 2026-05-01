import { useCallback, useMemo } from 'react';

import { useAppSelector } from '../../hooks';

import { selectors } from './myLevels.slice';
import type { MyLevel } from './myLevels.state';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useMyLevelsSelectors = (): { [key in keyof typeof selectors]: ReturnType<(typeof selectors)[key]> } & {
  readonly myLevelList: MyLevelList;
  readonly getMyLevelById: GetMyLevelById;
  readonly getMyLevelByIdx: GetMyLevelByIdx;
} => {
  /* -------------------------------- selectors ------------------------------- */

  const rawMyLevelList = useAppSelector(selectors.rawMyLevelList);

  /* ------------------------------- / selectors ------------------------------ */

  /* ---------------------------- custom selectors ---------------------------- */

  const myLevelList = useMemo<MyLevelList>(
    () =>
      rawMyLevelList.map((level) => ({
        ...level,
        gridWidth: level.grid[0].length,
        gridHeight: level.grid.length,
        // complexity: calcArtComplexity(level.grid),
        complexity: 1,
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

type MyLevelList = ReadonlyArray<MyLevel>;
type GetMyLevelById = (id: string) => MyLevel | null;
type GetMyLevelByIdx = (idx: number) => MyLevel | null;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
