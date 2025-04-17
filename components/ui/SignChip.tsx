import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet } from "react-native";

import Chip from "./Chip";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { scaleHeight } from "@/utils/scaling";

type SignChipProps = {
  label?: string;
  onPress: () => void;
  icon?: React.ReactNode;
};
const SignChip = ({ label, icon, onPress }: SignChipProps) => {
  return (
    <ThemedView style={styles.chipContainer}>
      <Chip label={label} icon={icon} onPress={onPress} style={styles.chip} />
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    marginBottom: scaleHeight(15),
  },
  chip: {
    fontFamily: "Inter_600SemiBold",
  },
});

export default SignChip;
