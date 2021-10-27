import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native';
import { Asset } from 'expo-asset';

import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
    await Asset.loadAsync(require('./positiveko.jpeg'));
    // prefetch보다는 loadAsync로 로컬 파일 require하는 방식 사용할 것
    await Image.prefetch('https://reactnative.dev/img/oss_logo.png');
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
