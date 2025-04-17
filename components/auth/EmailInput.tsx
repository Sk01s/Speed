import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setEmail, validateEmail } from "@/features/auth/authFormSlice";
import { responsiveFont } from "@/utils/scaling";

type EmailInputProps = {
  placeholder?: string;
  lightColor?: string;
  darkColor?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailInput = ({
  placeholder = "Enter your email",
  lightColor,
  darkColor,
}: EmailInputProps) => {
  const dispatch = useAppDispatch();
  const { email, emailError } = useAppSelector((state) => state.authForm);

  // Theme colors
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBackground"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const placeholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "placeholder"
  );
  const errorColor = useThemeColor({}, "error");

  const handleEmailChange = (text: string) => {
    dispatch(setEmail(text));
    if (!emailRegex.test(text)) {
      dispatch(validateEmail("Please enter a valid email address"));
    } else {
      dispatch(validateEmail(null));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor,
            color: textColor,
            borderColor: emailError ? errorColor : "transparent",
            borderWidth: 1,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email ?? ""}
        onChangeText={handleEmailChange}
      />
      {emailError && (
        <Text style={[styles.errorText, { color: errorColor }]}>
          {emailError}
        </Text>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: responsiveFont(16),
  },
  errorText: {
    fontSize: responsiveFont(12),
    marginTop: 4,
    marginLeft: 4,
  },
});

export default EmailInput;
