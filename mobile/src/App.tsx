import type React from 'react';
import 'react-native-get-random-values';
import { PaperProvider, Portal } from 'react-native-paper';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { ApiDictionaryProvider } from '@/components';
import { theme } from '@/constants';
import { store } from '@/store';

import { AppPresentation } from './App.presentation';

const BASE_URL = 'http://192.168.31.111:7000/api';
const REFRESH_TOKEN_URL = 'user/refresh-token';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const App: React.FC<Props> = () => {
  return (
    <PaperProvider theme={theme}>
      <ApiDictionaryProvider baseURL={BASE_URL} refreshTokenURL={REFRESH_TOKEN_URL}>
        <Provider store={store}>
          <Portal.Host>
            <AppPresentation />
          </Portal.Host>
        </Provider>
      </ApiDictionaryProvider>
    </PaperProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
