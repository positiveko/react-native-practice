import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';

export type RootStackParamList = {
  Tabs: undefined;
  Stack: {
    screen: string;
    params: Object;
  };
};

export type StackScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Nav = createNativeStackNavigator<RootStackParamList>();

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: 'card', headerShown: false }}>
    <Nav.Screen name='Tabs' component={Tabs} />
    <Nav.Screen name='Stack' component={Stack} />
  </Nav.Navigator>
);
export default Root;
