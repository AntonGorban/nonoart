import React, { useCallback, useEffect, useState } from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useIsLoadingFlag } from '@nono-art/hooks';

import { type MyLevel, useStoreSelectors } from '@/store';

import type { RootStackParamList } from '../routes';

import { LevelLoadingPlug, LevelNotFoundPlug } from './components';
import { Designer } from './Designer';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const DesignerScreen: React.FC<Props> = ({ route }) => {
  const {
    params: { myLevelId },
  } = route;

  const {
    myLevels: { getMyLevelById },
  } = useStoreSelectors();

  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(true);

  const [myLevel, setLevel] = useState<MyLevel | null>(null);

  const getLevel = useCallback(async () => {
    enableIsLoading();
    const res = getMyLevelById(myLevelId);
    if (!!res) setLevel(res);
    else setLevel(null);
    disableIsLoading();
  }, [disableIsLoading, enableIsLoading, getMyLevelById, myLevelId]);

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  /* --------------------------------- RETURN --------------------------------- */

  if (isLoading) return <LevelLoadingPlug />;

  if (!!myLevel) return <Designer myLevel={myLevel} />;

  return <LevelNotFoundPlug />;
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'Designer'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
