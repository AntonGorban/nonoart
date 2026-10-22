import { Typography } from 'antd';
import React from 'react';

import type { D } from '@nono-art/domain';

/* -------------------------------------------------------------------------- */
/*                                    CONST                                   */
/* -------------------------------------------------------------------------- */

const MAX_PREVIEW_WIDTH = 120;
const MAX_PREVIEW_HEIGHT = 96;
const MIN_CELL_SIZE = 2;
const MAX_CELL_SIZE = 10;
const GAP = 1;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const LevelGridPreview = React.memo<Props>(({ grid, colors }) => {
  const width = grid[0]?.length ?? 0;
  const height = grid.length;

  if (width === 0 || height === 0) {
    return (
      <Typography.Text type="secondary" code>
        пусто
      </Typography.Text>
    );
  }

  const cellSize = Math.max(
    MIN_CELL_SIZE,
    Math.min(MAX_CELL_SIZE, Math.floor(Math.min(MAX_PREVIEW_WIDTH / width, MAX_PREVIEW_HEIGHT / height)) - GAP),
  );

  return (
    <div
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
        gap: GAP,
        padding: 2,
        background: '#fafafa',
        border: '1px solid #f0f0f0',
        width: 'fit-content',
      }}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}:${c}`}
            style={{
              width: cellSize,
              height: cellSize,
              background: cell === null ? '#ffffff' : colors[cell as D.Level.SelectedColor],
            }}
          />
        )),
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly grid: D.Level.Grid;
  readonly colors: D.Level.Colors;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
