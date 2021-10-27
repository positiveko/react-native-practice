import React from 'react';
import AppLoading from 'expo-app-loading';
import { useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './navigation/Stack';

export default function App() {
  const [assets] = useAssets([require('./positiveko.jpeg')]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
