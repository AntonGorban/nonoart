import { useCallback, useEffect, useState } from 'react';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import { uuidV4 } from '@nono-art/utils';

import './App.css';

import { useApiDictionaryContext } from './context';

function App() {
  const { apiDictionary } = useApiDictionaryContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<REST.user.get.R | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiDictionary.user.get({}, {}, {});
      setUsers(res.data);
    } catch (error) {
      setError(getApiError(error));
    } finally {
      setIsLoading(false);
    }
  }, [apiDictionary.user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <h1>App</h1>

      <hr />

      <pre>{JSON.stringify({ isLoading, uuidV4: uuidV4() }, null, 2)}</pre>

      <hr />

      <pre>{JSON.stringify({ users }, null, 2)}</pre>

      <hr />

      <pre>{JSON.stringify({ error }, null, 2)}</pre>
    </>
  );
}

export default App;
