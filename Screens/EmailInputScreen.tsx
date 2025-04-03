import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeScreen } from "@/components/SafeScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import EmailInput from "@/components/EmailInput";
import NextButton from "@/components/NextButton";
import DividerWithText from "@/components/ui/DividerWithText";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

const EmailInputScreen = () => {
  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titlecontainer}>
          <ThemedText type="text-3xl" style={styles.title}>
            Enter you Email
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.emailContainer}>
          <EmailInput />
          <NextButton />
        </ThemedView>
        <ThemedText type="text-sub" font="font-sans">
          By proceeding, you consent to get email, including by automated means,
          from Speed and its affiliates to the number provided.
        </ThemedText>
        <DividerWithText />
        <GoogleLoginButton onPress={() => {}} />
      </ThemedView>
    </SafeScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: "17%",
    padding: "4%",
    flex: 1,
  },
  title: {
    marginBottom: "5%",
  },
  titlecontainer: {
    marginHorizontal: "2%",
  },
  emailContainer: {
    gap: "16%",
  },
});
export default EmailInputScreen;
