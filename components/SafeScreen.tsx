// components/SafeScreen.tsx
import React from "react";
import { StyleSheet, StatusBar, Platform, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeScreenProps extends ViewProps {
  children: React.ReactNode;
  statusBarBg?: string;
  statusBarStyle?: "dark-content" | "light-content";
}

export const SafeScreen = ({
  children,
  style,
  statusBarBg = "#ffffff",
  statusBarStyle = "dark-content",
  ...rest
}: SafeScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBg}
        translucent={Platform.OS === "android"}
      />

      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.select({
              ios: insets.top,
              android: StatusBar.currentHeight,
            }),
            backgroundColor: statusBarBg,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
