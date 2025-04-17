// screens/Landing.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { useAppSelector } from "@/hooks/useStore";

import { ThemedView } from "@/components/ThemedView";
import { SafeScreen } from "@/components/auth/SafeScreen";
import { ThemedText } from "@/components/ThemedText";
import PhoneInput from "@/components/auth/PhoneInput";
import NextButton from "@/components/auth/NextButton";
import { Images } from "@/utils/images";
import { scaleHeight } from "@/utils/scaling";
import { isValidPhoneNumber } from "@/utils";

const Landing = () => {
  const phoneNumber = useAppSelector((state) => state.authForm.phoneNumber);

  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <Image
          source={Images.landing}
          // placeholder="https://example.com/placeholder.jpg"
          contentFit="cover"
          style={styles.LandingImage}
          cachePolicy="memory-disk"
        />
        <ThemedView style={styles.InputContainer}>
          <ThemedText type="text-4xl">
            Use your speed account to get started
          </ThemedText>
          <PhoneInput placeholder="232 188 7651" />
          <ThemedView style={{ marginBottom: scaleHeight(12) }} />
          <NextButton
            nextScreen="/auth/email"
            isValid={isValidPhoneNumber(phoneNumber)}
          />
        </ThemedView>
      </ThemedView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  InputContainer: {
    paddingTop: "5%",
    paddingHorizontal: "2%",
  },
  LandingImage: {
    flex: 0.9,
    resizeMode: "contain",
  },
});

export default Landing;
