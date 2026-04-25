import { useCallback, useState } from 'react';

import { useFlag } from './useFlag';

export const useIsLoadingFlag = (defaultIsLoading: boolean = false) => {
  const [
    isLoading,
    { set: setIsLoading, enable: enableIsLoading, disable: disableIsLoading, toggle: toggleIsLoading },
  ] = useFlag(defaultIsLoading);

  return { isLoading, enableIsLoading, disableIsLoading, toggleIsLoading, setIsLoading };
};
