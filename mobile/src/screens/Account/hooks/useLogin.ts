import { useCallback, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useLogin = () => {
  const [login, setLogin] = useState<string>('');

  const changeLogin = useCallback((str: string) => setLogin(str.substring(0, 50)), []);

  return { login, changeLogin };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
