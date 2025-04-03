import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({
  style,
  onPress,
}: {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.text}>Next</Text>
      <AntDesign
        name="arrowright"
        size={16}
        color="white"
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  icon: {
    marginTop: 1,
  },
});

export default NextButton;
