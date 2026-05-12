import React, { type ComponentProps, useCallback } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { uuidV4 } from '@nono-art/utils';

import { appHeaderStore, useStoreActions, useStoreSelectors } from '@/store';

import { MyLevelsPresentation } from './MyLevels.presentation';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const MyLevels = React.memo<Props>(({ navToDesigner }) => {
  const {
    myLevels: { myLevelList },
  } = useStoreSelectors();

  const {
    myLevels: { createMyLevel },
  } = useStoreActions();

  const navToDesignerHandler = useCallback(
    (myLevelId: string) => {
      appHeaderStore.set.state({
        title: 'Загрузка уровня...',
        icon: <ActivityIndicator size={14} animating />,
        actionList: null,
      });
      navToDesigner(myLevelId);
    },
    [navToDesigner],
  );

  const createMyLevelHandler = useCallback(() => {
    const id = uuidV4();
    createMyLevel(id);
    navToDesignerHandler(id);
  }, [createMyLevel, navToDesignerHandler]);

  /* --------------------------------- RETURN --------------------------------- */

  return (
    <MyLevelsPresentation
      myLevelList={myLevelList}
      createMyLevel={createMyLevelHandler}
      navToDesigner={navToDesignerHandler}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type MyLevelsPresentationProps = ComponentProps<typeof MyLevelsPresentation>;

interface Props extends Omit<MyLevelsPresentationProps, 'myLevelList' | 'createMyLevel'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
