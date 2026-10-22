import { useCallback, useState } from 'react';

import { type ApiError, getApiError } from '@nono-art/api';
import type { DAL } from '@nono-art/dal';
import { useIsLoadingFlag } from '@nono-art/hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useSignInForm = (signIn: DAL.user.auth.SignIn, data: Parameters<DAL.user.auth.SignIn>) => {
  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(false);
  const [error, setError] = useState<ApiError | null>(null);

  const submit = useCallback(async () => {
    enableIsLoading();
    setError(null);
    try {
      await signIn(...data);
    } catch (error) {
      setError(getApiError(error));
    } finally {
      disableIsLoading();
    }
  }, [data, disableIsLoading, enableIsLoading, signIn]);

  return { isLoading, error, submit };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
