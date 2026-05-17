import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import { D } from '@nono-art/domain';

import { useApiDictionary } from '../../hooks';

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

export const useDAL = () => {
  /* ----------------------------- response config ---------------------------- */

  const { api } = useApiDictionary();

  const key = useMemo(() => '/user/auth', []);

  const fetcher = useCallback(
    async () => api.user.auth({}, {}, {}).then((res) => prepareResponse(res.data)),
    [api.user],
  );

  /* ---------------------------- / response config --------------------------- */

  /* ---------------------------------- fetch --------------------------------- */

  const { data: auth, error: rawError, isLoading, isValidating, mutate } = useSWR<Auth | null>(key, fetcher);

  const error = useMemo<ApiError | null>(() => (!!rawError ? getApiError(rawError) : null), [rawError]);

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);

  /* --------------------------------- / fetch -------------------------------- */

  /* -------------------------------- selectors ------------------------------- */

  const isAuth = useMemo<boolean>(() => !!auth, [auth]);

  const user = useMemo<User | null>(() => auth?.user ?? null, [auth?.user]);

  const userId = useMemo<D.User.Id | null>(() => user?.id ?? null, [user?.id]);
  const userLogin = useMemo<D.User.Login | null>(() => user?.login ?? null, [user?.login]);
  const userRole = useMemo<D.User.Role | null>(() => user?.role ?? null, [user?.role]);

  const isUser = useMemo<boolean>(() => userRole === D.User.Role.user, [userRole]);
  const isModerator = useMemo<boolean>(() => userRole === D.User.Role.moderator, [userRole]);
  const isAdmin = useMemo<boolean>(() => userRole === D.User.Role.admin, [userRole]);

  /* ------------------------------- / selectors ------------------------------ */

  /* -------------------------------- mutations ------------------------------- */

  const signUp = useCallback<SignUp>(
    async (body) => {
      const { data } = await api.user.signUp({}, {}, body);
      mutate((p) => (!!p ? { ...p, ...data } : p));
      return data;
    },
    [api.user, mutate],
  );

  const signIn = useCallback<SignIn>(
    async (body) => {
      const { data } = await api.user.signIn({}, {}, body);
      mutate((p) => (!!p ? { ...p, ...data } : p));
      return data;
    },
    [api.user, mutate],
  );

  const refreshToken = useCallback<RefreshToken>(
    async (body) => {
      const { data } = await api.user.refreshToken({}, {}, body);
      mutate((p) => (!!p ? { ...p, ...data } : p));
      return data;
    },
    [api.user, mutate],
  );

  const signOut = useCallback<SignOut>(async () => {
    const { data } = await api.user.signOut({}, {}, {});
    mutate((p) => (!!p ? null : p));
    return data;
  }, [api.user, mutate]);

  /* ------------------------------- / mutations ------------------------------ */

  /* --------------------------------- RETURN --------------------------------- */

  return {
    auth,
    isAuth,
    user,
    userId,
    userLogin,
    userRole,
    isUser,
    isModerator,
    isAdmin,
    error,
    isLoading,
    isValidating,
    refresh,
    mutate,
    signUp,
    signIn,
    refreshToken,
    signOut,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   / HOOK                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (data: Response): Auth | null => data.auth;

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type SignUp = (body: REST.user.signUp.B) => Promise<REST.user.signUp.R>;
export type SignIn = (body: REST.user.signIn.B) => Promise<REST.user.signIn.R>;
export type RefreshToken = (body: REST.user.refreshToken.B) => Promise<REST.user.refreshToken.R>;
export type SignOut = () => Promise<REST.user.signOut.R>;

/* -------------------------------------------------------------------------- */

export interface User extends RUser {}

export interface Auth extends RAuth {}

/* -------------------------------------------------------------------------- */

export type RUser = RAuth['user'];

export type RAuth = NonNullable<Response['auth']>;

export type Response = REST.user.auth.R;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
