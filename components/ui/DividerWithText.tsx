import { View, Text, StyleSheet } from "react-native";

export default function DividerWithText() {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
    </View>
  );
}
const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#777",
  },
});
