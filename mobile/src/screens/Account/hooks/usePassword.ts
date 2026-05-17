import { useCallback, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const usePassword = () => {
  const [password, setPassword] = useState<string>('');

  const changePassword = useCallback((str: string) => setPassword(str.substring(0, 50)), []);

  return { password, changePassword };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
