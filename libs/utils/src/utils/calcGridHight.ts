import type { D } from '@nono-art/domain';

export const calcGridHeight = (grid: D.Level.Grid): D.Level.GridHeight => grid.length;
