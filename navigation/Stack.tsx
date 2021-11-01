import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLACK_COLOR } from '../colors';
import Detail from '../screens/Detail';
import { useColorScheme } from 'react-native';

export type StackParamList = {
  Detail: undefined;
};

const NativeStack = createNativeStackNavigator<StackParamList>();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? '#132c30' : '#e3f3b2',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
      }}>
      <NativeStack.Screen name='Detail' component={Detail} />
    </NativeStack.Navigator>
  );
};
export default Stack;
