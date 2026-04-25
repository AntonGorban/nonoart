import { createContext, useContext } from 'react';

import { createApiDictionary } from '@nono-art/api';

export const api = createApiDictionary({
  baseURL: 'http://localhost:7000/api',
  getAccessToken: () => {
    console.log('getAccessToken');
    return '';
  },
  getRefreshToken: () => {
    console.log('getRefreshToken');
    return '';
  },
  updateAccessToken: (token) => {
    console.log('updateAccessToken', token);
  },
  updateRefreshToken: (token) => {
    console.log('updateRefreshToken', token);
  },
  onUnauthorized: () => {
    console.log('onUnauthorized');
  },
});

export const apiDictionaryContext = createContext(api);

export const useApiDictionaryContext = () => useContext(apiDictionaryContext);
