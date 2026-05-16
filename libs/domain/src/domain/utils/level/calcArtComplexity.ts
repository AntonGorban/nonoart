import type { Level } from '../../Level.domain';

const SAME_COLOR_PENALTY = 1;
const DIFF_COLOR_PENALTY = 13;
const SCALE_FACTOR = 100;

export const calcArtComplexity = (art: Level.Grid): number => {
  let complexity = 0;

  art.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      const rightCell: Level.Cell | undefined = row[colIdx + 1];
      const bottomCell: Level.Cell | undefined = art[rowIdx + 1]?.[colIdx];
      const diagonalCell: Level.Cell | undefined = art[rowIdx + 1]?.[colIdx + 1];

      if (rightCell !== undefined) complexity += compareCells(col, rightCell);
      if (bottomCell !== undefined) complexity += compareCells(col, bottomCell);
      if (diagonalCell !== undefined) complexity += compareCells(col, diagonalCell);
    });
  });

  return Math.round(complexity / SCALE_FACTOR);
};

const compareCells = (a: Level.Cell, b: Level.Cell): number => {
  return a === b ? SAME_COLOR_PENALTY : DIFF_COLOR_PENALTY;
};
