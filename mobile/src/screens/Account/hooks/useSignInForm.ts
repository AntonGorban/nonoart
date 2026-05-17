import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';

import { getApiError } from '@nono-art/api';
import type { DAL } from '@nono-art/dal';
import { useIsLoadingFlag } from '@nono-art/hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useSignInForm = (signIn: DAL.user.auth.SignIn, data: Parameters<DAL.user.auth.SignIn>) => {
  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setError(null);
    enableIsLoading();
    try {
      await signIn(...data);
    } catch (error) {
      const apiError = getApiError(error);
      setError(apiError.message);
      Toast.show({ text1: apiError.message, type: 'error' });
    } finally {
      disableIsLoading();
    }
  }, [data, disableIsLoading, enableIsLoading, signIn]);

  return { isLoading, error, submit };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
