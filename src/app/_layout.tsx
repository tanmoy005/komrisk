import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { useColorScheme } from '@/src/components/useColorScheme';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import AuthProvider from '@/src/provider/AuthProvider';
import { persistor, store } from '@/src/store';
import { headerColor } from '@/src/style';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {





  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });



  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // <Provider store={store}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <Stack screenOptions={{
              headerStyle: headerColor
            }}>
              {/* <ScreenCaptureProvider> */}
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(pages)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="menu" options={{ title: "Profile", headerShown: true, headerTitleAlign: 'center', presentation: 'modal' }} />
              {/* </ScreenCaptureProvider> */}
            </Stack>
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider >
  );
}
