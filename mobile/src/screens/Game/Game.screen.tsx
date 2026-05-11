import React, { useCallback, useEffect, useState } from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useIsLoadingFlag } from '@nono-art/hooks';

import { type Level, useStoreSelectors } from '@/store';

import type { RootStackParamList } from '../routes';

import { LevelLoadingPlug, LevelNotFoundPlug } from './components';
import { Game } from './Game';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const GameScreen: React.FC<Props> = ({ route }) => {
  const {
    params: { levelId },
  } = route;

  const {
    levels: { getLevelById },
  } = useStoreSelectors();

  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(true);

  const [level, setLevel] = useState<Level | null>(null);

  const getLevel = useCallback(async () => {
    enableIsLoading();
    const res = getLevelById(levelId);
    if (!!res) setLevel(res);
    else setLevel(null);
    disableIsLoading();
  }, [disableIsLoading, enableIsLoading, getLevelById, levelId]);

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  /* --------------------------------- RETURN --------------------------------- */

  if (isLoading) return <LevelLoadingPlug />;

  if (!!level) return <Game level={level} />;

  return <LevelNotFoundPlug />;
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'Game'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
