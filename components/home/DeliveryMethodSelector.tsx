// components/home/DeliveryMethodSelector.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { responsiveFont } from "@/utils/scaling";
import Chip from "../ui/Chip";

const DELIVERY_METHODS = ["Delivery", "Pickup", "Dine-in"];

const DeliveryMethodSelector = () => {
  const [selected, setSelected] = useState("Delivery");

  return (
    <View style={styles.container}>
      {DELIVERY_METHODS.map((method) => (
        <Chip
          key={method}
          label={method}
          onPress={() => setSelected(method)}
          style={styles.chipText}
          padding={20}
          isActive={selected === method}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  chipText: {
    fontSize: responsiveFont(15),
    fontWeight: "400",
  },
  selectedText: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default DeliveryMethodSelector;
