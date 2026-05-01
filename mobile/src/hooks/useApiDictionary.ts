import { useApiContext } from '@nono-art/dal';

export const useApiDictionary = () => {
  const api = useApiContext();
  if (!api) throw new Error('api was not set');
  return api;
};
