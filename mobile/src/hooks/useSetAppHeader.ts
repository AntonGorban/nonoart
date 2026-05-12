import { useLayoutEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { appHeaderStore } from '@/store';

export const useSetAppHeader = (...args: Parameters<typeof appHeaderStore.set.state>) => {
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) appHeaderStore.set.state(...args);
  }, [args, isFocused]);
};
