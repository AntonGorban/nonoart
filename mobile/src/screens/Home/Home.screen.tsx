import React, { type ComponentProps } from 'react';

import { FontAwesome, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UI } from '@nono-art/ui-mobile';

import { ScreenHeader } from '@/components';

import { AccountScreen } from '../Account';
import { LevelsScreen } from '../Levels';
import { MyLevelsScreen } from '../MyLevels';
import type { RootStackParamList } from '../routes';

const Tab = createBottomTabNavigator<RootStackParamList>();

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const HomeScreen: React.FC<Props> = () => {
  return (
    <Tab.Navigator initialRouteName={TAB_NAVIGATOR_INITIAL_ROUTE_NAME} screenOptions={TAB_NAVIGATOR_SCREEN_OPTIONS}>
      <Tab.Screen
        name="Levels"
        component={LevelsScreen}
        options={{
          header: () => (
            <ScreenHeader
              title="Уровни"
              icon={
                <>
                  <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                  <FontAwesome6 name="puzzle-piece" size={18} color={UI.color.white} />
                </>
              }
            />
          ),
          tabBarIcon: ({ color }) => <FontAwesome6 name="puzzle-piece" size={TAB_BAR_ICON_SIZE} color={color} />,
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="MyLevels"
        component={MyLevelsScreen}
        options={{
          header: () => (
            <ScreenHeader
              title="Мои уровни"
              icon={
                <>
                  <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                  <FontAwesome name="paint-brush" size={18} color={UI.color.white} />
                </>
              }
            />
          ),
          tabBarIcon: ({ color }) => <FontAwesome name="paint-brush" size={TAB_BAR_ICON_SIZE} color={color} />,
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          header: () => (
            <ScreenHeader
              title="Аккаунт"
              icon={
                <>
                  <MaterialCommunityIcons name="alert-circle-outline" size={14} color={UI.color.yellow300} />

                  <FontAwesome6 name="user-large" size={18} color={UI.color.white} />
                </>
              }
            />
          ),
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-large" size={TAB_BAR_ICON_SIZE} color={color} />,
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const TAB_BAR_ICON_SIZE = 32;

const TAB_NAVIGATOR_INITIAL_ROUTE_NAME: ComponentProps<typeof Tab.Navigator>['initialRouteName'] = 'Levels';

const TAB_NAVIGATOR_SCREEN_OPTIONS: ComponentProps<typeof Tab.Navigator>['screenOptions'] = {
  tabBarStyle: {
    backgroundColor: UI.color.black700,
    borderColor: UI.color.tealA400,
    height: 64,
  },
  tabBarActiveTintColor: UI.color.tealA400,
  tabBarInactiveTintColor: UI.color.grey700,
  tabBarIconStyle: {
    flex: 1,
    width: '100%',
  },
  tabBarLabelStyle: { fontSize: 0 },
};

/* -------------------------------------------------------------------------- */
/*                                  / STYLES                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
