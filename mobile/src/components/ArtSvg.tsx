import React, { useMemo } from 'react';
import type { NumberProp } from 'react-native-svg';
import Svg, { Rect } from 'react-native-svg';

import type { D } from '@nono-art/domain';
import { UI } from '@nono-art/ui-mobile';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ArtSvg = React.memo<Props>(({ grid, colors, width, height }) => {
  const rectangles = useMemo(() => mergeCellsToRectangles(grid), [grid]);

  // return (
  //   <Svg
  //     width={width}
  //     height={height}
  //     viewBox={`0 0 ${grid[0].length} ${grid.length}`}
  //     style={{ backgroundColor: UI.color.white }}
  //   >
  //     {grid.map((row, i) =>
  //       row.map(
  //         (cell, j) => cell !== null && <Rect key={`${i}x${j}`} x={j} y={i} width={1} height={1} fill={colors[cell]} />,
  //       ),
  //     )}
  //   </Svg>
  // );

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${grid[0].length} ${grid.length}`}
      style={{ backgroundColor: UI.color.white }}
    >
      {rectangles.map((rect) => (
        <Rect
          key={`${rect.y}-${rect.x}-${rect.w}-${rect.h}`} // Можно заменить на `${rect.y}x${rect.x}` для более стабильного ключа
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          fill={colors[rect.fillIndex]}
        />
      ))}
    </Svg>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

/**
 * Преобразует сетку в массив сплошных прямоугольников для оптимизации SVG.
 * Алгоритм проходит по каждой строке и для каждого цвета объединяет
 * последовательные ячейки одного цвета в один Rectangle.
 */
// function mergeCellsToRectangles(
//   grid: D.Level.Grid,
// ): Array<{ x: number; y: number; w: number; h: number; fillIndex: number }> {
//   const rectangles: Array<{ x: number; y: number; w: number; h: number; fillIndex: number }> = [];

//   for (let y = 0; y < grid.length; y++) {
//     const row = grid[y];
//     let x = 0;
//     while (x < row.length) {
//       const colorIndex = row[x];
//       if (colorIndex !== null) {
//         let startX = x;
//         while (x < row.length && row[x] === colorIndex) x++;
//         // Попытка вертикального объединения (опционально, см. примечание)
//         rectangles.push({
//           x: startX,
//           y: y,
//           w: x - startX,
//           h: 1,
//           fillIndex: colorIndex,
//         });
//       } else {
//         x++;
//       }
//     }
//   }
//   return rectangles;
// }

/**
 * Преобразует сетку в массив сплошных прямоугольников для оптимизации SVG.
 * Алгоритм: для каждой не посещённой ячейки определяет максимальную ширину
 * вправо (непрерывный цвет), затем максимальную высоту вниз, при которой
 * все строки на той же ширине имеют тот же цвет. Помечает все ячейки
 * прямоугольника как обработанные.
 */
// function mergeCellsToRectangles(
//   grid: D.Level.Grid,
// ): Array<{ x: number; y: number; w: number; h: number; fillIndex: number }> {
//   const rows = grid.length;
//   const cols = grid[0]?.length ?? 0;
//   if (rows === 0 || cols === 0) return [];

//   const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
//   const rectangles: Array<{ x: number; y: number; w: number; h: number; fillIndex: number }> = [];

//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       const color = grid[y][x];
//       if (color === null || visited[y][x]) continue;

//       // 1. Максимальная ширина в текущей строке
//       let width = 1;
//       while (x + width < cols && grid[y][x + width] === color && !visited[y][x + width]) {
//         width++;
//       }

//       // 2. Максимальная высота, сохраняющая сплошной цвет на всю ширину
//       let height = 1;
//       let canExtend = true;
//       while (y + height < rows && canExtend) {
//         for (let dx = 0; dx < width; dx++) {
//           const cell = grid[y + height][x + dx];
//           if (cell !== color || visited[y + height][x + dx]) {
//             canExtend = false;
//             break;
//           }
//         }
//         if (canExtend) height++;
//       }

//       // 3. Помечаем весь прямоугольник как посещённый
//       for (let dy = 0; dy < height; dy++) {
//         for (let dx = 0; dx < width; dx++) {
//           visited[y + dy][x + dx] = true;
//         }
//       }

//       rectangles.push({ x, y, w: width, h: height, fillIndex: color });
//     }
//   }

//   return rectangles;
// }

type Rectangle = { x: number; y: number; w: number; h: number; fillIndex: number };

/**
 * Создаёт пустую матрицу visited (false)
 */
function createVisited(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

/**
 * Проверяет, можно ли расширить прямоугольник вниз на одну строку
 */
function canExtendDown(
  grid: D.Level.Grid,
  visited: boolean[][],
  x: number,
  y: number,
  width: number,
  color: D.Level.Cell,
): boolean {
  if (y + 1 >= grid.length) return false;
  return Array.from({ length: width }, (_, dx) => {
    const cell = grid[y + 1][x + dx];
    return cell !== null && cell === color && !visited[y + 1][x + dx];
  }).every(Boolean);
}

/**
 * Максимальная высота прямоугольника, начиная с (x, y) заданной ширины
 */
function getMaxHeight(
  grid: D.Level.Grid,
  visited: boolean[][],
  x: number,
  y: number,
  width: number,
  color: D.Level.Cell,
): number {
  let height = 1;
  while (canExtendDown(grid, visited, x, y + height - 1, width, color)) {
    height++;
  }
  return height;
}

/**
 * Помечает ячейки прямоугольника как посещённые
 */
function markRectangle(visited: boolean[][], rect: Rectangle): void {
  Array.from({ length: rect.h }, (_, dy) => {
    Array.from({ length: rect.w }, (_, dx) => {
      visited[rect.y + dy][rect.x + dx] = true;
    });
  });
}

/**
 * Преобразует сетку в массив сплошных прямоугольников (вертикальное объединение)
 */
export function mergeCellsToRectangles(grid: D.Level.Grid): Rectangle[] {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return [];

  const visited = createVisited(rows, cols);
  const rectangles: Rectangle[] = [];

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Пропускаем пустые ячейки или уже обработанные
      if (cell === null || visited[y][x]) return;

      // Определяем максимальную ширину в текущей строке
      let width = 1;
      while (x + width < cols && grid[y][x + width] === cell && !visited[y][x + width]) {
        width++;
      }

      // Определяем максимальную высоту для этого прямоугольника
      const height = getMaxHeight(grid, visited, x, y, width, cell);

      // Формируем прямоугольник
      const rect: Rectangle = { x, y, w: width, h: height, fillIndex: cell };
      markRectangle(visited, rect);
      rectangles.push(rect);
    });
  });

  return rectangles;
}

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly grid: D.Level.Grid;
  readonly colors: D.Level.Colors;
  readonly width?: NumberProp;
  readonly height?: NumberProp;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
