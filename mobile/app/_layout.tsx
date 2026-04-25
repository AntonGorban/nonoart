import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { ApiDictionaryProvider } from '@/components';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

const BASE_URL = 'http://192.168.31.111:7000/api';
const REFRESH_TOKEN_URL = 'user/refresh-token';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ApiDictionaryProvider baseURL={BASE_URL} refreshTokenURL={REFRESH_TOKEN_URL}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApiDictionaryProvider>
  );
}
