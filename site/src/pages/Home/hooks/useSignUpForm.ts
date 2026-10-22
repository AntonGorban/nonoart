import { useCallback, useState } from 'react';

import { type ApiError, getApiError } from '@nono-art/api';
import type { DAL } from '@nono-art/dal';
import { useIsLoadingFlag } from '@nono-art/hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useSignUpForm = (signUp: DAL.user.auth.SignUp, data: Parameters<DAL.user.auth.SignUp>) => {
  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(false);
  const [error, setError] = useState<ApiError | null>(null);

  const submit = useCallback(async () => {
    setError(null);
    enableIsLoading();
    try {
      await signUp(...data);
    } catch (error) {
      setError(getApiError(error));
    } finally {
      disableIsLoading();
    }
  }, [data, disableIsLoading, enableIsLoading, signUp]);

  return { isLoading, error, submit };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */
