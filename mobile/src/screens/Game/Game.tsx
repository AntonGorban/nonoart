import React, { useMemo } from 'react';

import { D } from '@nono-art/domain';
import { useEnumFlag } from '@nono-art/hooks';

import { ColorsSection, Grid, ScreenView } from '@/components';
import { type Level } from '@/store';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Game: React.FC<Props> = ({ level }) => {
  const isDone = useMemo<boolean>(() => level.status === D.Level.Status.done, [level.status]);

  const [selectedColor, setSelectedColor] = useEnumFlag<D.Level.SelectedColor>(1);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <ScreenView padding={0} gap={0}>
      <Grid
        grid={isDone ? level.grid : level.progress}
        colors={level.colors}
        gridWidth={level.gridWidth}
        gridHeight={level.gridHeight}
        isDone={isDone}
        selectedColor={selectedColor}
        showCounters
      />

      <ColorsSection colors={level.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
    </ScreenView>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly level: Level;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
