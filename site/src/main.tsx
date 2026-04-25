import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.tsx';
import { ApiDictionaryProvider } from './components/index.ts';

const BASE_URL = 'http://localhost:7000/api';
const REFRESH_TOKEN_URL = 'user/refresh-token';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiDictionaryProvider baseURL={BASE_URL} refreshTokenURL={REFRESH_TOKEN_URL}>
      <App />
    </ApiDictionaryProvider>
  </StrictMode>,
);
