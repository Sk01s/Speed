import { responsiveFont } from "@/utils/scaling";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type ViewStyle,
  type TextStyle,
  StyleProp,
} from "react-native";

export type ThemedButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean; // 👈 Add this line
};

export function ThemedButton({
  title,
  onPress,
  leftIcon,
  rightIcon,
  containerStyle,
  textStyle,
  disabled = false, // 👈 Default false
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        containerStyle,
        disabled && styles.disabledButton, // 👈 Apply disabled style
      ]}
      activeOpacity={0.8}
      disabled={disabled} // 👈 Pass disabled to TouchableOpacity
    >
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
        {title}
      </Text>
      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 100,
  },
  text: {
    color: "#fff",
    fontSize: responsiveFont(16),
    fontWeight: "600",
    flexShrink: 1,
    flexGrow: 0,
    includeFontPadding: false,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: "#888", // Dimmed text color when disabled
  },
});
