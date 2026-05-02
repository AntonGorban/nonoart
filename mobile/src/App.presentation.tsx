import { StatusBar } from 'expo-status-bar';
import type React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UI } from '@nono-art/ui-mobile';

import { ScreenHeader } from './components';
import {
  AsyncStorageScreen,
  ColorPaletteScreen,
  DesignerScreen,
  GameScreen,
  HomeScreen,
  type RootStackParamList,
  UsersScreen,
} from './screens';

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
        <Stack.Navigator initialRouteName="Home">
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
            initialParams={{ levelId: undefined }}
            options={{
              header: () => (
                <ScreenHeader
                  title=""
                  isBackButton
                  icon={<MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.red300} />}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Designer"
            component={DesignerScreen}
            options={{
              header: () => (
                <ScreenHeader
                  title=""
                  isBackButton
                  icon={<MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.red300} />}
                />
              ),
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
              header: () => (
                <ScreenHeader
                  title="Палитра цветов"
                  isBackButton
                  icon={<MaterialCommunityIcons name="palette" size={20} color={UI.color.white} />}
                />
              ),
            }}
          />

          <Stack.Screen
            name="AsyncStorage"
            component={AsyncStorageScreen}
            options={{
              header: () => (
                <ScreenHeader
                  title="Хранилище"
                  isBackButton
                  icon={<MaterialCommunityIcons name="database" size={20} color={UI.color.white} />}
                />
              ),
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
              header: () => (
                <ScreenHeader
                  title="Пользователи"
                  isBackButton
                  icon={
                    <>
                      <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                      <MaterialCommunityIcons name="account-group" size={20} color={UI.color.white} />
                    </>
                  }
                />
              ),
            }}
          />

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / ADMIN                                  */}
          {/* -------------------------------------------------------------------------- */}
        </Stack.Navigator>
      </NavigationContainer>
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
