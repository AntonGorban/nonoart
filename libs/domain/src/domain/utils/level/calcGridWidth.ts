import type { Level } from '../../Level.domain';

export const calcGridWidth = (grid: Level.Grid): Level.GridWidth => grid[0]?.length ?? 1;
