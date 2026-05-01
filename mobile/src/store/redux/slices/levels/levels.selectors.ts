import { useCallback } from 'react';

import { useAppSelector } from '../../hooks';

import { selectors } from './levels.slice';
import type { Level } from './levels.state';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useLevelsSelectors = (): { [key in keyof typeof selectors]: ReturnType<(typeof selectors)[key]> } & {
  readonly getLevelById: GetLevelById;
  readonly getLevelByIdx: GetLevelByIdx;
} => {
  /* -------------------------------- selectors ------------------------------- */

  const levelList = useAppSelector(selectors.levelList);

  /* ------------------------------- / selectors ------------------------------ */

  /* ---------------------------- custom selectors ---------------------------- */

  const getLevelById = useCallback<GetLevelById>(
    (id) => levelList.find((level) => level.id === id) || null,
    [levelList],
  );

  const getLevelByIdx = useCallback<GetLevelByIdx>((idx) => levelList[idx] || null, [levelList]);

  /* --------------------------- / custom selectors --------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return {
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

type GetLevelById = (id: string) => Level | null;
type GetLevelByIdx = (idx: number) => Level | null;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
