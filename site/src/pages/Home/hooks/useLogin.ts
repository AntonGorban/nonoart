import React, { useCallback, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useLogin = () => {
  const [login, setLogin] = useState<string>('');

  const changeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value.substring(0, 50)), []);

  return { login, changeLogin };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
