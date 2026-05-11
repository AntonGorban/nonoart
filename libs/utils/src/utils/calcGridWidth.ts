import type { D } from '@nono-art/domain';

export const calcGridWidth = (grid: D.Level.Grid): D.Level.GridWidth => grid[0]?.length ?? 1;
