import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.loadAsync(image);
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require('./positiveko.jpeg'),
      'https://reactnative.dev/img/oss_logo.png',
    ]);
    await Promise.all([...fonts, ...images]);
  };

  if (!ready) {
    return (
      <AppLoading
        onFinish={onFinish}
        onError={console.error}
        startAsync={startLoading}
      />
    );
  }
  return <Text>We are done</Text>;
}
