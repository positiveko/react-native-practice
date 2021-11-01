import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from '../colors';
import { Ionicons } from '@expo/vector-icons';

export type TabParamList = {
  Movies: undefined;
  TV: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const Tabs = () => {
  // shift + command + a : 다크모드 변경
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name='Movies'
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='film-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='TV'
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='tv-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
