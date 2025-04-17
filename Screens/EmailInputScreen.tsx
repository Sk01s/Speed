import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "@/hooks/useStore"; // 👈 Make sure this is set
import { SafeScreen } from "@/components/auth/SafeScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import EmailInput from "@/components/auth/EmailInput";
import NextButton from "@/components/auth/NextButton";
import DividerWithText from "@/components/ui/DividerWithText";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { scaleHeight } from "@/utils/scaling";

const EmailInputScreen = () => {
  const email = useAppSelector((state) => state.authForm.email);
  const emailError = useAppSelector((state) => state.authForm.emailError);

  const isEmailValid: boolean = !!email && !emailError;

  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titlecontainer}>
          <ThemedText type="text-3xl" style={styles.title}>
            Enter your Email
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.emailContainer}>
          <EmailInput />
          <NextButton nextScreen={"/auth/password"} isValid={isEmailValid} />
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
    paddingTop: scaleHeight(150),
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
    gap: scaleHeight(20),
    marginBottom: scaleHeight(15),
  },
});

export default EmailInputScreen;
