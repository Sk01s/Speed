import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedButton } from "./ThemedButton"; // Adjust the import path as needed
import { useThemeColor } from "@/hooks/useThemeColor";

export function GoogleLoginButton({ onPress }: { onPress: () => void }) {
  // Get colors using the hook
  const containerBackground = useThemeColor(
    { light: "#fff", dark: "#111" },
    "background"
  );
  const borderColor = useThemeColor({ light: "#ccc", dark: "#ccc" }, "icon");
  const textColor = useThemeColor({ light: "#000", dark: "#ECEDEE" }, "text");
  const IconColor = useThemeColor({ light: "#000", dark: "#ECEDEE" }, "text");

  return (
    <ThemedButton
      title="Continue with Google"
      onPress={onPress}
      leftIcon={<FontAwesome name="google" size={20} color={IconColor} />}
      containerStyle={{
        backgroundColor: containerBackground,
        borderWidth: 1,
        borderColor: borderColor,
      }}
      textStyle={{
        color: textColor,
        fontWeight: "bold",
      }}
    />
  );
}
