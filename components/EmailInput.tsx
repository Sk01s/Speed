import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const EmailInput = ({ placeholder = "Enter your email" }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#EEEEEE",
  },
});

export default EmailInput;
