import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPassword, validatePassword } from "@/features/auth/authFormSlice";
import { responsiveFont } from "@/utils/scaling";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PasswordInputProps = {
  placeholder?: string;
  lightColor?: string;
  darkColor?: string;
};

const PasswordInput = ({
  placeholder = "Enter your password",
  lightColor,
  darkColor,
}: PasswordInputProps) => {
  const dispatch = useAppDispatch();
  const { password, passwordError } = useAppSelector((state) => state.authForm);
  const [showPassword, setShowPassword] = React.useState(false);

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

  const handlePasswordChange = (text: string) => {
    dispatch(setPassword(text));
    if (text.length < 8) {
      dispatch(validatePassword("Password must be at least 8 characters"));
    } else {
      dispatch(validatePassword(null));
    }
  };

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor,
              color: textColor,
              borderColor: passwordError ? errorColor : "transparent",
              borderWidth: 1,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={password ?? ""}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={toggleVisibility}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={responsiveFont(20)}
            color={textColor}
          />
        </TouchableOpacity>
      </View>
      {passwordError && (
        <Text style={[styles.errorText, { color: errorColor }]}>
          {passwordError}
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
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: responsiveFont(16),
    paddingRight: 40, // Space for icon
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  errorText: {
    fontSize: responsiveFont(12),
    marginTop: 4,
    marginLeft: 4,
  },
});

export default PasswordInput;
