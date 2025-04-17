import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

import { ThemedView } from "@/components/ThemedView";
import { responsiveFont, scaleHeight, scaleWidth } from "@/utils/scaling";
import SignChip from "@/components/ui/SignChip";
import { SafeScreen } from "@/components/auth/SafeScreen";
import { Images } from "@/utils/images";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import Chip from "@/components/ui/Chip";

const WelcomeScreen = () => {
  const textColor = useThemeColor({}, "text");
  const handNavigation = () => {};
  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <Image source={Images.complete} style={styles.image} />
        <ThemedView style={styles.seperator} />

        <ThemedView style={styles.title}>
          <ThemedText type="text-3xl">All set.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.seperator} />
        <ThemedView style={styles.seperator} />
        <ThemedText type="text-sub">
          You’ll be signed into your account in a moment. If nothing happens,
          click continue
        </ThemedText>
        <ThemedView style={styles.seperator} />
        <ThemedView style={styles.containerChip}>
          <Chip
            label="Continue  "
            onPress={handNavigation}
            icon={
              <MaterialIcons name="arrow-forward" size={20} color={textColor} />
            }
            right={true}
            style={{ fontSize: responsiveFont(18) }}
          />
        </ThemedView>
      </ThemedView>
    </SafeScreen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleHeight(150),
    padding: scaleWidth(20),
    flex: 1,
  },
  image: { width: scaleHeight(80), height: scaleHeight(80) },
  containerChip: { width: scaleWidth(120) },
  title: {
    paddingHorizontal: scaleWidth(5),
  },
  seperator: {
    marginBottom: scaleHeight(20),
  },
});
