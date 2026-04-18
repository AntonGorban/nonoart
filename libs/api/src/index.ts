import { createLevelApiDictionary, createUserApiDictionary } from './api';
import { type CreateApiProps, createClient } from './client.api';

export const createApiDictionary = (options: CreateApiProps) => {
  const client = createClient(options);

  const apiDictionary = {
    user: createUserApiDictionary(client),
    level: createLevelApiDictionary(client),
  };

  return { apiDictionary, client };
};
