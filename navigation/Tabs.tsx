import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {
  BLACK_COLOR,
  DARK_GREY,
  VERMILLAN_COLOR,
} from '../colors';
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
        backgroundColor: isDark ? BLACK_COLOR : '#f3eae4',
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          borderTopWidth: 1.5,
          borderTopColor: BLACK_COLOR,
          backgroundColor: isDark ?'#505050' : '#f0a48a',
        },
        tabBarActiveTintColor: isDark ? VERMILLAN_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : '#f1ffc7',
        headerStyle: {
          borderBottomWidth: 1.5,
          borderBottomColor: BLACK_COLOR,
          backgroundColor: isDark ? '#294a6d' : '#95b3d3',
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
