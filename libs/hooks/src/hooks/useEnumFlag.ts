import { useCallback, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useEnumFlag = <T>(initValue: T): [value: T, setValue: (flag: T) => void] => {
  const [flag, setFlag] = useState<T>(initValue);

  const setValue = useCallback((value: T) => setFlag(value), []);

  return [flag, setValue];
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
