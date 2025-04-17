import { StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedView } from "../ThemedView";
import { scaleHeight, scaleWidth } from "@/utils/scaling";
import Chip from "../ui/Chip";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, useRouter } from "expo-router";

type SignNavigationProps = {
  isValidForNextStep: boolean;
  nextScreen: Href;
  previousScreen?: Href;
};

const SignNavigation = ({
  isValidForNextStep,
  nextScreen,
  previousScreen,
}: SignNavigationProps) => {
  const router = useRouter();
  const textColor = useThemeColor({}, "text");

  const handlePreviousNav = () => {
    if (previousScreen) router.back();
  };

  const handleNextNav = () => {
    if (isValidForNextStep) router.push(nextScreen);
  };

  return (
    <ThemedView style={styles.Container}>
      <Chip
        onPress={handlePreviousNav}
        icon={<MaterialIcons name="arrow-back" size={24} color={textColor} />}
        padding={14}
        isDisabled={!previousScreen}
      />
      <Chip
        onPress={handleNextNav}
        label="Next"
        icon={
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={textColor}
            style={styles.forwardIcon}
          />
        }
        right={true}
        isDisabled={!isValidForNextStep}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(25),
    marginHorizontal: scaleWidth(10),
  },
  forwardIcon: {
    marginLeft: 8,
  },
});

export default SignNavigation;
