import type { Level } from '../../Level.domain';

export const calcGridHeight = (grid: Level.Grid): Level.GridHeight => grid.length;
