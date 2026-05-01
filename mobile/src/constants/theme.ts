import Color from 'color';
import { MD3LightTheme as DefaultTheme, type PaperProvider } from 'react-native-paper';

import { UI } from '@nono-art/ui-mobile';

export const theme: NonNullable<Parameters<typeof PaperProvider>[0]['theme']> = {
  ...DefaultTheme,
  dark: true,
  mode: 'exact',
  colors: {
    ...DefaultTheme.colors,
    primary: UI.color.primary,
    // primaryContainer: 'magenta',
    secondary: UI.color.secondary,
    secondaryContainer: UI.color.secondary,
    // tertiary: 'magenta',
    // tertiaryContainer: 'magenta',
    surface: UI.color.black700,
    surfaceVariant: UI.color.black700,
    surfaceDisabled: UI.color.greyBlack,
    background: UI.color.black500,
    error: UI.color.redA700,
    // errorContainer: 'magenta',
    onPrimary: UI.color.black900,
    // onPrimaryContainer: 'magenta',
    // onSecondary: UI.color.black900,
    onSecondaryContainer: UI.color.black900,
    // onTertiary: 'magenta',
    // onTertiaryContainer: 'magenta',
    onSurface: UI.color.white,
    onSurfaceVariant: UI.color.grey,
    onSurfaceDisabled: UI.color.blueGrey500,
    // onError: 'magenta',
    // onErrorContainer: 'magenta',
    // onBackground: 'magenta',
    // outline: UI.color.white,
    outline: UI.color.grey,
    // outlineVariant: 'magenta',
    // inverseSurface: 'magenta',
    // inverseOnSurface: 'magenta',
    // inversePrimary: 'magenta',
    // shadow: 'magenta',
    // scrim: 'magenta',
    backdrop: Color(UI.color.black900).alpha(0.9).string(),
    elevation: {
      ...DefaultTheme.colors.elevation,
      level3: UI.color.black100,
    },
  },
  roundness: 2,
  fonts: {
    ...DefaultTheme.fonts,
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily: 'Roboto',
    },
  },
};
