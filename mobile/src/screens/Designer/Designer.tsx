import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { D } from '@nono-art/domain';
import { useEnumFlag } from '@nono-art/hooks';
import { UI } from '@nono-art/ui-mobile';

import { ColorsSection, Grid, ScreenView } from '@/components';
import { useSetAppHeader } from '@/hooks';
import { type MyLevel } from '@/store';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const Designer: React.FC<Props> = ({ myLevel }) => {
  const [selectedColor, setSelectedColor] = useEnumFlag<D.Level.SelectedColor>(1);

  useSetAppHeader({
    title: myLevel.name,
    icon: <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.red300} />,
    actionList: null,
  });

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
