import { useCallback, useMemo } from 'react';

import type { DAL } from '@nono-art/dal';
import { useEnumFlag } from '@nono-art/hooks';

import { useFormData } from './useFormData';
import { useSignInForm } from './useSignInForm';
import { useSignUpForm } from './useSignUpForm';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useForm = (signInRequest: DAL.user.auth.SignIn, signUpRequest: DAL.user.auth.SignUp) => {
  /* ---------------------------------- flag ---------------------------------- */

  const [signFlag, setSignFlag] = useEnumFlag<SignFlag>('signIn');
  const changeSignFlag = useCallback((flag: SignFlag) => setSignFlag(flag), [setSignFlag]);

  /* --------------------------------- / flag --------------------------------- */

  /* ---------------------------------- data ---------------------------------- */

  const data = useFormData();

  /* --------------------------------- / data --------------------------------- */

  /* --------------------------------- signIn --------------------------------- */

  const signInData = useMemo<Parameters<DAL.user.auth.SignIn>>(
    () => [{ login: data.login, password: data.password }],
    [data.login, data.password],
  );

  const signIn = useSignInForm(signInRequest, signInData);

  /* -------------------------------- / signIn -------------------------------- */

  /* --------------------------------- signUp --------------------------------- */

  const signUpData = useMemo<Parameters<DAL.user.auth.SignUp>>(
    () => [{ login: data.login, password: data.password }],
    [data.login, data.password],
  );

  const signUp = useSignUpForm(signUpRequest, signUpData);

  /* -------------------------------- / signUp -------------------------------- */

  /* --------------------------------- RETURN --------------------------------- */

  return {
    signFlag,
    data,
    changeSignFlag,
    signIn,
    signUp,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type SignFlag = 'signIn' | 'signUp';

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
