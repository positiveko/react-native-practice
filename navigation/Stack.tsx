import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { YELLOW_COLOR } from '../colors';

const ScreenOne: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { goBack, setOptions, navigate } }) => (
  <>
    <TouchableOpacity onPress={() => goBack()}>
      <Text>go back</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setOptions({ title: '❤️' })}>
      <Text>Change title</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate('Tabs', { screen: 'Search' })}>
      <Text>Go to search</Text>
    </TouchableOpacity>
  </>
);

const NativeStack = createNativeStackNavigator();
const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTintColor: YELLOW_COLOR,
      headerBackTitleVisible: false,
    }}>
    <NativeStack.Screen name='One' component={ScreenOne} />
    <NativeStack.Screen name='Two' component={ScreenTwo} />
    <NativeStack.Screen name='Three' component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
