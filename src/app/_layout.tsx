import '../global.css';

import {
  ChakraPetch_400Regular,
  ChakraPetch_500Medium,
  ChakraPetch_600SemiBold,
  ChakraPetch_700Bold,
} from '@expo-google-fonts/chakra-petch';
import { Michroma_400Regular } from '@expo-google-fonts/michroma';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  useFonts,
} from '@expo-google-fonts/space-grotesk';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Michroma_400Regular,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    ChakraPetch_400Regular,
    ChakraPetch_500Medium,
    ChakraPetch_600SemiBold,
    ChakraPetch_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ contentStyle: { backgroundColor: '#0B0E14' } }} />
        <Stack.Screen
          name="collection"
          options={{
            presentation: 'modal',
            contentStyle: { backgroundColor: '#F1F0EC' },
          }}
        />
        <Stack.Screen
          name="car/[id]"
          options={{ contentStyle: { backgroundColor: '#F1F0EC' } }}
        />
      </Stack>
    </>
  );
}
