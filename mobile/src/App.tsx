import type React from 'react';
import { PaperProvider, Portal } from 'react-native-paper';
import 'react-native-reanimated';

import { AppPresentation } from './App.presentation';
import { ApiDictionaryProvider } from './components/core/ApiDictionaryProvider';
import { theme } from './constants';

const BASE_URL = 'http://192.168.31.111:7000/api';
const REFRESH_TOKEN_URL = 'user/refresh-token';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const App: React.FC<Props> = () => {
  return (
    <PaperProvider theme={theme}>
      <ApiDictionaryProvider baseURL={BASE_URL} refreshTokenURL={REFRESH_TOKEN_URL}>
        <Portal.Host>
          <AppPresentation />
        </Portal.Host>
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
