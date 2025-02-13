import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { AuthProvider } from '../src/providers/AuthProvider';

export default function RootLayout() {
  // Only run frameworkReady in web environment
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.frameworkReady?.();
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </AuthProvider>
  );
}