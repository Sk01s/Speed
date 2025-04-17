// components/SafeScreen.tsx
import React from "react";
import { StyleSheet, StatusBar, Platform, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";

interface SafeScreenProps extends ViewProps {
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  statusBarStyle?: "dark-content" | "light-content";
}

export const SafeScreen = ({
  children,
  style,
  lightColor,
  darkColor,
  statusBarStyle,
  ...rest
}: SafeScreenProps) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  // Get theme colors
  const statusBarBackground = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  // Determine status bar style
  const defaultBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";
  const barStyle = statusBarStyle || defaultBarStyle;

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={statusBarBackground}
        translucent={Platform.OS === "android"}
      />

      <ThemedView
        style={[
          styles.container,
          {
            paddingTop: Platform.select({
              ios: insets.top,
              android: StatusBar.currentHeight,
            }),
            backgroundColor: statusBarBackground,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
