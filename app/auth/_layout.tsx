import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: false, // Hide back arrow
        headerShown: true, // Keep header visible
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Explicitly list other screens */}
      <Stack.Screen name="email" options={{ headerShown: false }} />
      <Stack.Screen name="password" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
}
