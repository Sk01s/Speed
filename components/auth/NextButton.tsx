import React from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import { Href, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { ThemedButton } from "../ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { scaleHeight } from "@/utils/scaling";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

type NextButtonProps = {
  style?: ViewStyle;
  nextScreen: Href;
  isValid?: boolean; // 👈 Add this
};

const NextButton = ({ style, nextScreen, isValid = true }: NextButtonProps) => {
  const router = useRouter();
  const buttonBg = useThemeColor({}, "buttonBackground");
  const buttonText = useThemeColor({}, "buttonText");

  const handleNext = () => {
    if (isValid) {
      router.push(nextScreen);
    }
  };

  return (
    <ThemedButton
      title="Next"
      onPress={handleNext}
      rightIcon={
        <AntDesign
          name="arrowright"
          size={16}
          color={isValid ? buttonText : "#888"}
          style={styles.icon}
        />
      }
      containerStyle={[styles.button, { backgroundColor: buttonBg }, style]}
      textStyle={{ color: buttonText }}
      disabled={!isValid}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    paddingVertical: scaleHeight(15),
  },
  icon: {
    marginTop: 1,
  },
});

export default NextButton;
