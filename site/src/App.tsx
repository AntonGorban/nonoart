import { useCallback, useEffect, useState } from 'react';

import { type ApiError, getApiError } from '@nono-art/api';
import type { REST } from '@nono-art/api-types';
import { useFlag, useIsLoadingFlag } from '@nono-art/hooks';
import { UI } from '@nono-art/ui-web';
import { uuidV4 } from '@nono-art/utils';

import './App.css';

import { useApiDictionary } from './hooks';

function App() {
  const { api } = useApiDictionary();

  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(false);
  const [users, setUsers] = useState<REST.user.get.R | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUsers = useCallback(async () => {
    enableIsLoading();
    setError(null);
    try {
      const res = await api.user.get({}, {}, {});
      setUsers(res.data);
    } catch (error) {
      setError(getApiError(error));
    } finally {
      disableIsLoading();
    }
  }, [api.user, disableIsLoading, enableIsLoading]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [flag, { toggle }] = useFlag();

  return (
    <>
      <h1>App</h1>

      <hr />

      <span>{flag ? 'true' : 'false'}</span>

      <UI.Button onClick={toggle}>toggle</UI.Button>

      <hr />

      <UI.Button onClick={fetchUsers}>refresh users</UI.Button>

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
