import { useCallback, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useFlag = (
  defaultFlag: boolean = false,
): [
  flag: boolean,
  {
    readonly enable: () => void;
    readonly disable: () => void;
    readonly toggle: () => void;
    readonly set: React.Dispatch<React.SetStateAction<boolean>>;
  },
] => {
  const [flag, setFlag] = useState<boolean>(defaultFlag);

  const enable = useCallback(() => {
    setFlag(true);
  }, []);

  const disable = useCallback(() => {
    setFlag(false);
  }, []);

  const toggle = useCallback(() => {
    setFlag((p) => !p);
  }, []);

  return [flag, { enable, disable, toggle, set: setFlag }];
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
