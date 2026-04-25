import type { AxiosInstance } from 'axios';

import { createLevelApiDictionary, createUserApiDictionary, type Level, type User } from './api/index';
import { type CreateApiProps, createClient } from './client.api';

export const createApiDictionary = (options: CreateApiProps) => {
  const client: ApiClient = createClient(options);

  const apiDictionary: ApiDictionary = {
    user: createUserApiDictionary(client),
    level: createLevelApiDictionary(client),
  };

  return { apiDictionary, client };
};

export type ApiDictionary = {
  readonly user: User;
  readonly level: Level;
};

export type ApiClient = AxiosInstance;
