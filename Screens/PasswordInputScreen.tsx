import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import PasswordInput from "@/components/auth/PasswordInput";
import { SafeScreen } from "@/components/auth/SafeScreen";
import { scaleHeight } from "@/utils/scaling";
import { ThemedText } from "@/components/ThemedText";
import SignChip from "@/components/ui/SignChip";
import SignNatigation from "@/components/auth/SignNatigation";
import { useAppSelector } from "@/hooks/useStore";

const PasswordInputScreen = () => {
  const { password, passwordError } = useAppSelector((state) => state.authForm);
  const handleResetPassword = () => {};

  // Calculate validation state
  const isValidForNextStep = passwordError === null && !!password?.length;

  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titlecontainer}>
          <ThemedText type="text-3xl" style={styles.title}>
            Enter your password
          </ThemedText>
        </ThemedView>
        <PasswordInput />
        <ThemedView style={styles.seperator} />
        <SignChip
          label="I've forgotten my password"
          onPress={handleResetPassword}
        />
        <SignChip label="I can't sign in" onPress={handleResetPassword} />
      </ThemedView>
      <SignNatigation
        isValidForNextStep={isValidForNextStep}
        previousScreen={"/auth/email"}
        nextScreen={"/auth/welcome"}
      />
    </SafeScreen>
  );
};

// ... rest of the styles remain the same
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
  seperator: {
    marginBottom: scaleHeight(20),
  },
});
export default PasswordInputScreen;
