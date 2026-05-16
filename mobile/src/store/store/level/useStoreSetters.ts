import { useCallback } from 'react';

import type { D } from '@nono-art/domain';

import type { StoreLevel } from './types';
import { createNewProgress } from './utils';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useStoreSetters = (
  setLevel: (fn: (prev: StoreLevel) => StoreLevel) => void,
  gridWidth: D.Level.GridWidth,
  gridHeight: D.Level.GridHeight,
) => {
  /* ----------------------------- setProgressCell ---------------------------- */

  const setProgressCell = useCallback(
    (rowIdx: number, colIdx: number, value: D.Level.SelectedColor) => {
      setLevel((p) => ({
        ...p,
        progress:
          p.progress?.map((row, rIdx) =>
            rIdx === rowIdx ? row.map((cell, cIdx) => (cIdx === colIdx ? (value !== cell ? value : null) : cell)) : row,
          ) ?? null,
        progressUpdatedAt: new Date(),
      }));
    },
    [setLevel],
  );

  /* ---------------------------- / setProgressCell --------------------------- */

  /* ------------------------------ clearProgress ----------------------------- */

  const clearProgress = useCallback(() => {
    setLevel((p) => ({ ...p, progress: createNewProgress(gridWidth, gridHeight) }));
  }, [gridHeight, gridWidth, setLevel]);

  /* ----------------------------- / clearProgress ---------------------------- */

  /* ---------------------------- clearProgressRow ---------------------------- */

  const clearProgressRow = useCallback(
    (rowIdx: number) => {
      setLevel((p) => ({
        ...p,
        progress: p.progress?.map((row, rIdx) => (rIdx === rowIdx ? new Array(gridWidth).fill(null) : row)) ?? null,
      }));
    },
    [gridWidth, setLevel],
  );

  /* --------------------------- / clearProgressRow --------------------------- */

  /* ---------------------------- clearProgressCol ---------------------------- */

  const clearProgressCol = useCallback(
    (colIdx: number) => {
      setLevel((p) => ({
        ...p,
        progress: p.progress?.map((row) => row.map((cell, cIdx) => (cIdx === colIdx ? null : cell))) ?? null,
      }));
    },
    [setLevel],
  );

  /* --------------------------- / clearProgressCol --------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return { setProgressCell, clearProgress, clearProgressRow, clearProgressCol };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
