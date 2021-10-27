import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [assets] = useAssets([require('./positiveko.jpeg')]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return <Text>We are done</Text>;
}
