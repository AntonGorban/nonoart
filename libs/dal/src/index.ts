import { useCallback, useState } from 'react';

export const dal = () => 'dal';

export const useFlag = (
  defaultFlag: boolean = false,
): [
  flag: boolean,
  {
    set: React.Dispatch<React.SetStateAction<boolean>>;
    enable: () => void;
    disable: () => void;
    toggle: () => void;
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

  return [flag, { set: setFlag, enable, disable, toggle }];
};
