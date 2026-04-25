import { createContext, useContext } from 'react';

import { type ApiClient, type ApiDictionary, type CreateApiProps } from '@nono-art/api';

export const apiContext = createContext<{
  readonly api: ApiDictionary;
  readonly apiClient: ApiClient;
  readonly setGetAccessToken: (fn: GetAccessToken) => void;
  readonly setGetRefreshToken: (fn: GetRefreshToken) => void;
  readonly setUpdateAccessToken: (fn: UpdateAccessToken) => void;
  readonly setUpdateRefreshToken: (fn: UpdateRefreshToken) => void;
  readonly setOnUnauthorized: (fn: OnUnauthorized) => void;
} | null>(null);

export const useApiContext = () => useContext(apiContext);

export type GetAccessToken = CreateApiProps['getAccessToken'];
export type GetRefreshToken = CreateApiProps['getRefreshToken'];
export type UpdateAccessToken = CreateApiProps['updateAccessToken'];
export type UpdateRefreshToken = CreateApiProps['updateRefreshToken'];
export type OnUnauthorized = CreateApiProps['onUnauthorized'];
