import { StatusBar } from 'expo-status-bar';
import type React from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Text } from 'react-native-paper';

// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DAL } from '@nono-art/dal';
import { UI } from '@nono-art/ui-mobile';

// import { UI } from '@nono-art/ui';

// import { ScreenHeader } from './Components';
// import {
//   AsyncStorageScreen,
//   ColorPaletteScreen,
//   DesignerScreen,
//   GameScreen,
//   HomeScreen,
//   RootStackParamList,
//   UsersScreen,
// } from './Screens';

export type RootStackParamList = {
  /* ---------------------------------- home ---------------------------------- */

  readonly Home: undefined;

  readonly Levels: undefined;

  readonly MyLevels: undefined;

  readonly Account: undefined;

  /* --------------------------------- / home --------------------------------- */

  /* ---------------------------------- game ---------------------------------- */

  readonly Game: { readonly levelId?: string };

  readonly Designer: { readonly levelId: string };

  /* --------------------------------- / game --------------------------------- */

  /* ---------------------------------- utils --------------------------------- */

  readonly ColorPalette: undefined;

  readonly AsyncStorage: undefined;

  /* --------------------------------- / utils -------------------------------- */

  /* ---------------------------------- admin --------------------------------- */

  readonly Users: undefined;

  /* --------------------------------- / admin -------------------------------- */
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const AppPresentation: React.FC<Props> = () => {
  // DAL.user.auth.useGet();

  // return (
  //   <>
  //     <StatusBar style="dark" backgroundColor={UI.color.black700} translucent={false} />

  //     <UI.Hello />
  //     <UI.Hello />
  //     <UI.Hello />
  //     <UI.Hello />
  //     <UI.Hello />
  //     <UI.Hello />

  //     <Text>Hello</Text>
  //   </>
  // );
  return (
    <>
      <StatusBar style="dark" backgroundColor={UI.color.black700} translucent={false} />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* -------------------------------------------------------------------------- */}
          {/*                                    HOME                                    */}
          {/* -------------------------------------------------------------------------- */}

          {/* <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} /> */}
          <Stack.Screen
            name="Home"
            component={() => (
              <Tab.Navigator
                initialRouteName="Levels"
                screenOptions={{
                  tabBarStyle: {
                    backgroundColor: UI.color.black700,
                    borderColor: UI.color.tealA400,
                    height: 52,
                  },
                  tabBarActiveTintColor: UI.color.tealA400,
                  tabBarInactiveTintColor: UI.color.grey700,
                  tabBarIconStyle: {},
                  tabBarLabelStyle: { fontSize: 0 },
                }}
              >
                <Tab.Screen
                  name="Levels"
                  component={() => (
                    <View>
                      <UI.Hello>LevelsScreen</UI.Hello>
                      <UI.Hello>LevelsScreen</UI.Hello>
                      <UI.Hello>LevelsScreen</UI.Hello>
                    </View>
                  )}
                  options={{
                    // header: () => (
                    //   <ScreenHeader
                    //     title="Уровни"
                    //     icon={
                    //       <>
                    //         <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                    //         <FontAwesome6 name="puzzle-piece" size={18} color={UI.color.white} />
                    //       </>
                    //     }
                    //   />
                    // ),
                    // tabBarIcon: ({ color }) => <FontAwesome6 name="puzzle-piece" size={28} color={color} />,
                    tabBarLabel: '',
                  }}
                />

                <Tab.Screen
                  name="MyLevels"
                  component={() => (
                    <View>
                      <UI.Hello>MyLevelsScreen</UI.Hello>
                      <UI.Hello>MyLevelsScreen</UI.Hello>
                      <UI.Hello>MyLevelsScreen</UI.Hello>
                    </View>
                  )}
                  options={{
                    // header: () => (
                    //   <ScreenHeader
                    //     title="Мои уровни"
                    //     icon={
                    //       <>
                    //         <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                    //         <FontAwesome name="paint-brush" size={18} color={UI.color.white} />
                    //       </>
                    //     }
                    //   />
                    // ),
                    // tabBarIcon: ({ color }) => <FontAwesome name="paint-brush" size={28} color={color} />,
                    tabBarLabel: '',
                  }}
                />

                <Tab.Screen
                  name="Account"
                  component={() => (
                    <View>
                      <UI.Hello>AccountScreen</UI.Hello>
                      <UI.Hello>AccountScreen</UI.Hello>
                      <UI.Hello>AccountScreen</UI.Hello>
                    </View>
                  )}
                  options={{
                    // header: () => (
                    //   <ScreenHeader
                    //     title="Аккаунт"
                    //     icon={
                    //       <>
                    //         <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                    //         <FontAwesome6 name="user-large" size={18} color={UI.color.white} />
                    //       </>
                    //     }
                    //   />
                    // ),
                    // tabBarIcon: ({ color }) => <FontAwesome6 name="user-large" size={28} color={color} />,
                    tabBarLabel: '',
                  }}
                />
              </Tab.Navigator>
            )}
            options={{ header: () => null }}
          />

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / HOME                                   */}
          {/* -------------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                    GAME                                    */}
          {/* -------------------------------------------------------------------------- */}

          {/* <Stack.Screen
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
          /> */}

          {/* <Stack.Screen
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
          /> */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / GAME                                   */}
          {/* -------------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                    UTILS                                   */}
          {/* -------------------------------------------------------------------------- */}

          {/* <Stack.Screen
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
          /> */}

          {/* <Stack.Screen
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
          /> */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                   / UTILS                                  */}
          {/* -------------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------------- */}
          {/*                                    ADMIN                                   */}
          {/* -------------------------------------------------------------------------- */}

          {/* <Stack.Screen
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
          /> */}

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
