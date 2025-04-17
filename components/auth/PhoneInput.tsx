// components/PhoneInput.tsx

import React, { useState } from "react";
import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import PhoneDropdown from "./PhoneDropdown";
import { responsiveFont } from "@/utils/scaling";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPhoneNumber } from "@/features/auth/authFormSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import { linkTo } from "expo-router/build/global-state/routing";

interface PhoneInputProps {
  placeholder?: string;
  style?: ViewStyle;
}

const PhoneInput = ({
  placeholder = "Phone number",
  style,
}: PhoneInputProps) => {
  const inputBackground = useThemeColor({}, "inputBackground");
  const textColor = useThemeColor({}, "text");
  const placeTextColor = useThemeColor({ dark: "", light: "" }, "text");

  const dispatch = useAppDispatch();
  const [localNumber, setLocalNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const handleNumberChange = (text: string) => {
    setLocalNumber(text);
    dispatch(setPhoneNumber(`${countryCode}${text}`));
  };

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    dispatch(setPhoneNumber(`${code}${localNumber}`));
  };

  return (
    <View
      style={[styles.container, style, { backgroundColor: inputBackground }]}
    >
      <PhoneDropdown onSelect={handleCountryChange} />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={placeTextColor}
        keyboardType="phone-pad"
        value={localNumber}
        onChangeText={handleNumberChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginBottom: "3%",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: responsiveFont(16),
  },
});

export default PhoneInput;
