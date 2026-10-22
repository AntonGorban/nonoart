import { Button, Flex, InputNumber } from 'antd';
import React, { useCallback, useState } from 'react';

import type { D } from '@nono-art/domain';

const CELL_SIZE = 24;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const GridEditor = React.memo<Props>(({ grid, colors, onChange }) => {
  const [paint, setPaint] = useState<D.Level.Cell>(0);

  const width = grid[0]?.length ?? 0;
  const height = grid.length;

  const setCell = useCallback(
    (r: number, c: number) => {
      const next = grid.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? paint : v)) : row)) as D.Level.Grid;
      onChange(next);
    },
    [grid, paint, onChange],
  );

  const setSize = useCallback(
    (w: number, h: number) => {
      const next = Array.from({ length: h }, (_, r) =>
        Array.from({ length: w }, (_, c) => grid[r]?.[c] ?? null),
      ) as D.Level.Grid;
      onChange(next);
    },
    [grid, onChange],
  );

  const clear = useCallback(() => {
    const next = grid.map((row) => row.map(() => null)) as D.Level.Grid;
    onChange(next);
  }, [grid, onChange]);

  return (
    <Flex vertical gap="middle">
      <Flex gap="small" align="center" wrap>
        <InputNumber
          min={1}
          max={25}
          value={width}
          onChange={(v) => setSize(v ?? 1, height)}
          addonBefore="Ширина"
          style={{ width: 150 }}
        />
        <InputNumber
          min={1}
          max={25}
          value={height}
          onChange={(v) => setSize(width, v ?? 1)}
          addonBefore="Высота"
          style={{ width: 150 }}
        />
        <Button onClick={clear} danger>
          Очистить сетку
        </Button>
      </Flex>

      <Flex gap="small" align="center" wrap>
        <span style={{ marginRight: 4 }}>Кисть:</span>
        <Button
          onClick={() => setPaint(null)}
          type={paint === null ? 'primary' : 'default'}
          style={{ width: 44, height: 44, fontWeight: 600 }}
          title="Ластик"
        >
          ∅
        </Button>
        <Button
          onClick={() => setPaint(0)}
          type={paint === 0 ? 'primary' : 'default'}
          style={{
            width: 44,
            height: 44,
            background: colors[0],
            border: paint === 0 ? '3px solid #1677ff' : '1px solid #d9d9d9',
          }}
          // title={`Цвет ${i + 1}`}
        />
        <Button
          onClick={() => setPaint(1)}
          type={paint === 1 ? 'primary' : 'default'}
          style={{
            width: 44,
            height: 44,
            background: colors[1],
            border: paint === 1 ? '3px solid #1677ff' : '1px solid #d9d9d9',
          }}
          // title={`Цвет ${i + 1}`}
        />
        <Button
          onClick={() => setPaint(2)}
          type={paint === 2 ? 'primary' : 'default'}
          style={{
            width: 44,
            height: 44,
            background: colors[2],
            border: paint === 2 ? '3px solid #1677ff' : '1px solid #d9d9d9',
          }}
          // title={`Цвет ${i + 1}`}
        />
      </Flex>

      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${width}, ${CELL_SIZE}px)`,
          gap: 1,
          padding: 4,
          background: '#fafafa',
          border: '1px solid #f0f0f0',
          alignSelf: 'flex-start',
        }}
      >
        {grid.map((row, r) =>
          row.map((v, c) => {
            const isNull = v === null;
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => setCell(r, c)}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  padding: 0,
                  border: '1px solid #e8e8e8',
                  background: isNull ? '#ffffff' : colors[v as 0 | 1 | 2],
                  cursor: 'pointer',
                }}
              />
            );
          }),
        )}
      </div>
    </Flex>
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
  readonly onChange: (grid: D.Level.Grid) => void;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
