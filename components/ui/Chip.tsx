// components/ui/Chip.tsx

import React from "react";
import {
  TextStyle,
  Pressable,
  StyleSheet,
  View,
  StyleProp,
  DimensionValue,
} from "react-native";
import { useColorScheme } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { responsiveFont } from "@/utils/scaling";
import { ThemedText } from "../ThemedText";

type ChipProps = {
  label?: string;
  style?: StyleProp<TextStyle>;
  onPress: () => void;
  icon?: React.ReactNode;
  right?: boolean;
  padding?: DimensionValue;
  isDisabled?: boolean;
  isActive?: boolean;
};

const Chip = ({
  label,
  onPress,
  icon,
  style,
  right,
  padding,
  isDisabled,
  isActive,
}: ChipProps) => {
  const scheme = useColorScheme();

  const backgroundColor = useThemeColor(
    {
      light: isActive === true ? "#333" : isActive === false ? "" : "#f1f1f1",
      dark: isActive === true ? "#333" : isActive === false ? "" : "#333",
    },
    "background"
  );

  const textColor = useThemeColor(
    {
      light: isActive ? "#fff" : Colors.light.text,
      dark: Colors.dark.text,
    },
    "text"
  );

  return (
    <Pressable
      style={[
        styles.chip,
        {
          backgroundColor,
          paddingHorizontal: padding ?? 12,
          paddingVertical: 12,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", opacity: isDisabled ? 0.35 : 1 }}>
        {!right && icon}
        {label && (
          <ThemedText
            style={[
              style,
              styles.chipText,
              {
                color: textColor,
                marginLeft: icon ? 8 : 0,
              },
            ]}
          >
            {label}
          </ThemedText>
        )}
        {right && icon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 35,
  },
  chipText: {
    fontWeight: "500",
    fontSize: responsiveFont(16),
  },
});

export default Chip;
