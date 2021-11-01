import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { YELLOW_COLOR } from '../colors';
import Detail from '../screens/Detail';

const NativeStack = createNativeStackNavigator();
const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTintColor: YELLOW_COLOR,
      headerBackTitleVisible: false,
    }}>
    <NativeStack.Screen name='Detail' component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
