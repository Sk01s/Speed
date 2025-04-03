import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";

import { ThemedView } from "@/components/ThemedView";
import { SafeScreen } from "@/components/SafeScreen";
import { Images } from "@/utils/images";
import { ThemedText } from "@/components/ThemedText";
import PhoneDropdown from "@/components/PhoneDropdown";
import PhoneInput from "@/components/PhoneInput";
import NextButton from "@/components/NextButton";

const Landing = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <Image
          source={Images.landing}
          placeholder="https://example.com/placeholder.jpg"
          contentFit="cover"
          style={styles.LandingImage}
          cachePolicy="memory-disk" // ← Caching strategy
        />
        <ThemedView style={styles.InputContainer}>
          <ThemedText type="text-4xl">
            Use your speed account to get started
          </ThemedText>
          <PhoneInput
            value={phoneNumber}
            onPhoneNumberChange={setPhoneNumber}
            placeholder="232 188 7651"
            style={{ marginTop: 15 }} // Optional custom styles
          />
          <NextButton />
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
    width: "100%",
    flex: 0.94,
    resizeMode: "contain",
  },
});

export default Landing;
