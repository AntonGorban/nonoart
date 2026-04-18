import { type CreateApiProps, createClient } from './client.api';

export const createApiDictionary = (options: CreateApiProps) => {
  const client = createClient(options);

  const apiDictionary = {};

  return { apiDictionary, client };
};
