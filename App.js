import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import Root from './navigation/Root';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };
  const isDark = useColorScheme() === "dark";
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}