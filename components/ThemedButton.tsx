import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type ViewStyle,
  type TextStyle,
} from "react-native";

export type ThemedButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export function ThemedButton({
  title,
  onPress,
  leftIcon,
  rightIcon,
  containerStyle,
  textStyle,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, containerStyle]}
      activeOpacity={0.8}
    >
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
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
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
