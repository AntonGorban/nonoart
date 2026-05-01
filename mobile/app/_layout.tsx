import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DarkTheme, ThemeProvider } from '@react-navigation/native';

import { UI } from '@nono-art/ui-mobile';

import { ApiDictionaryProvider } from '@/components';

export const unstable_settings = {
  anchor: '(tabs)',
};

const BASE_URL = 'http://192.168.31.111:7000/api';
const REFRESH_TOKEN_URL = 'user/refresh-token';

export default function RootLayout() {
  return (
    <ApiDictionaryProvider baseURL={BASE_URL} refreshTokenURL={REFRESH_TOKEN_URL}>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" backgroundColor={UI.color.black700} translucent={false} />
      </ThemeProvider>
    </ApiDictionaryProvider>
  );
}
