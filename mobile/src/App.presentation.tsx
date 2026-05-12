import { StatusBar } from 'expo-status-bar';
import type React from 'react';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UI } from '@nono-art/ui-mobile';

import { ScreenHeader } from '@/components';
import { toastConfig } from '@/constants';
import {
  AsyncStorageScreen,
  ColorPaletteScreen,
  DesignerScreen,
  GameScreen,
  HomeScreen,
  type RootStackParamList,
  UsersScreen,
} from '@/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const AppPresentation: React.FC<Props> = () => {
  // DAL.user.auth.useGet();

  return (
    <>
      <StatusBar style="light" backgroundColor={UI.color.black700} translucent={false} />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: { backgroundColor: UI.color.black500 },
            animation: 'none',
          }}
        >
          {/* -------------------------------------------------------------------------- */}
          {/*                                    HOME                                    */}
          {/* -------------------------------------------------------------------------- */}

          <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / HOME                                   */}
          {/* -------------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                    GAME                                    */}
          {/* -------------------------------------------------------------------------- */}

          <Stack.Screen
            name="Game"
            component={GameScreen}
            initialParams={{ levelId: 'null' }}
            options={{
              header: () => <ScreenHeader isBackButton />,
            }}
          />

          <Stack.Screen
            name="Designer"
            component={DesignerScreen}
            options={{
              header: () => <ScreenHeader isBackButton />,
            }}
          />

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / GAME                                   */}
          {/* -------------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                    UTILS                                   */}
          {/* -------------------------------------------------------------------------- */}

          <Stack.Screen
            name="ColorPalette"
            component={ColorPaletteScreen}
            options={{
              header: () => <ScreenHeader isBackButton />,
            }}
          />

          <Stack.Screen
            name="AsyncStorage"
            component={AsyncStorageScreen}
            options={{
              header: () => <ScreenHeader isBackButton />,
            }}
          />

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / UTILS                                  */}
          {/* -------------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                    ADMIN                                   */}
          {/* -------------------------------------------------------------------------- */}

          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{
              header: () => <ScreenHeader isBackButton />,
            }}
          />

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / ADMIN                                  */}
          {/* -------------------------------------------------------------------------- */}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast config={toastConfig} autoHide avoidKeyboard swipeable type="info" position="top" />
    </>
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
