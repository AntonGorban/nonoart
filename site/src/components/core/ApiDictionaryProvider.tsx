import type React from 'react';
import { useMemo } from 'react';

import { createApiDictionary, type CreateApiProps } from '@nono-art/api';
import { apiContext } from '@nono-art/dal';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const ApiDictionaryProvider: React.FC<Props> = ({ children, baseURL, refreshTokenURL }) => {
  const {
    api,
    apiClient,
    setGetAccessToken,
    setGetRefreshToken,
    setUpdateAccessToken,
    setUpdateRefreshToken,
    setOnUnauthorized,
  } = useMemo(() => {
    return createApi(baseURL, refreshTokenURL);
  }, [baseURL, refreshTokenURL]);

  const providerValue = useMemo(
    () => ({
      api,
      apiClient,
      setGetAccessToken,
      setGetRefreshToken,
      setUpdateAccessToken,
      setUpdateRefreshToken,
      setOnUnauthorized,
    }),
    [
      api,
      apiClient,
      setGetAccessToken,
      setGetRefreshToken,
      setOnUnauthorized,
      setUpdateAccessToken,
      setUpdateRefreshToken,
    ],
  );

  return <apiContext.Provider value={providerValue}>{children}</apiContext.Provider>;
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

const createApi = (baseURL: string, refreshTokenURL: string) => {
  let getAccessToken = defaultGetAccessToken;
  let getRefreshToken = defaultGetRefreshToken;
  let updateAccessToken = defaultUpdateAccessToken;
  let updateRefreshToken = defaultUpdateRefreshToken;
  let onUnauthorized = defaultOnUnauthorized;

  const setGetAccessToken = (fn: GetAccessToken) => {
    getAccessToken = fn;
  };
  const setGetRefreshToken = (fn: GetRefreshToken) => {
    getRefreshToken = fn;
  };
  const setUpdateAccessToken = (fn: UpdateAccessToken) => {
    updateAccessToken = fn;
  };
  const setUpdateRefreshToken = (fn: UpdateRefreshToken) => {
    updateRefreshToken = fn;
  };
  const setOnUnauthorized = (fn: OnUnauthorized) => {
    onUnauthorized = fn;
  };

  const { apiDictionary: api, client: apiClient } = createApiDictionary({
    baseURL,
    refreshTokenURL,
    getAccessToken: () => getAccessToken(),
    getRefreshToken: () => getRefreshToken(),
    updateAccessToken: (t) => updateAccessToken(t),
    updateRefreshToken: (t) => updateRefreshToken(t),
    onUnauthorized: () => onUnauthorized(),
  });

  return {
    api,
    apiClient,
    setGetAccessToken,
    setGetRefreshToken,
    setUpdateAccessToken,
    setUpdateRefreshToken,
    setOnUnauthorized,
  };
};

const defaultGetAccessToken: GetAccessToken = () => {
  console.log('getAccessToken');
  return '';
};

const defaultGetRefreshToken: GetRefreshToken = () => {
  console.log('getRefreshToken');
  return '';
};

const defaultUpdateAccessToken: UpdateAccessToken = (token) => {
  console.log('updateAccessToken', token);
};

const defaultUpdateRefreshToken: UpdateRefreshToken = (token) => {
  console.log('updateRefreshToken', token);
};

const defaultOnUnauthorized: OnUnauthorized = () => {
  console.log('onUnauthorized');
};

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  readonly children: React.ReactNode;
  readonly baseURL: string;
  readonly refreshTokenURL: string;
}

export type GetAccessToken = CreateApiProps['getAccessToken'];
export type GetRefreshToken = CreateApiProps['getRefreshToken'];
export type UpdateAccessToken = CreateApiProps['updateAccessToken'];
export type UpdateRefreshToken = CreateApiProps['updateRefreshToken'];
export type OnUnauthorized = CreateApiProps['onUnauthorized'];

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
