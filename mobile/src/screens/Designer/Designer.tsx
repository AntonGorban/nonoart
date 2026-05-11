import React, { useLayoutEffect } from 'react';

import type { D } from '@nono-art/domain';
import { useEnumFlag } from '@nono-art/hooks';

import { Grid, ScreenView } from '@/components';
import { type MyLevel, useStoreActions } from '@/store';

import { ColorsSection } from './components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Designer: React.FC<Props> = ({ myLevel }) => {
  const {
    config: { setAppHeaderTitle },
  } = useStoreActions();

  useLayoutEffect(() => {
    setAppHeaderTitle(myLevel.name);
  }, [myLevel.name, setAppHeaderTitle]);

  const [selectedColor, setSelectedColor] = useEnumFlag<D.Level.SelectedColor>(1);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <ScreenView padding={0} gap={0}>
      <Grid
        grid={myLevel.grid}
        colors={myLevel.colors}
        gridWidth={myLevel.gridWidth}
        gridHeight={myLevel.gridHeight}
        selectedColor={selectedColor}
      />

      <ColorsSection colors={myLevel.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
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
  readonly myLevel: MyLevel;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
