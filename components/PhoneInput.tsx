// components/PhoneInput.tsx
import React from "react";
import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import PhoneDropdown from "./PhoneDropdown"; // Your existing component

interface PhoneInputProps {
  value?: string;
  onPhoneNumberChange?: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

const PhoneInput = ({
  value,
  onPhoneNumberChange,
  placeholder = "Phone number",
  style,
}: PhoneInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <PhoneDropdown />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType="phone-pad"
        value={value}
        onChangeText={onPhoneNumberChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginBottom: "3%",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

export default PhoneInput;
