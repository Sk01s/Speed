// components/LoadingSkeleton.tsx
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

const SkeletonItem = () => {
  const grayLight = useThemeColor({ light: "#EEE", dark: "#666" }, "text");
  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.skeletonItem,
        { opacity: fadeAnim, backgroundColor: grayLight },
      ]}
    >
      <View style={[styles.skeletonImage, { backgroundColor: grayLight }]} />
      <View style={[styles.skeletonText, { backgroundColor: grayLight }]} />
      <View
        style={[styles.skeletonInfoContainer, { backgroundColor: grayLight }]}
      >
        <View style={[styles.skeletonRating, { backgroundColor: grayLight }]} />
        <View
          style={[styles.skeletonDelivery, { backgroundColor: grayLight }]}
        />
      </View>
    </Animated.View>
  );
};

export const LoadingSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(3)].map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  skeletonItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  skeletonImage: {
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonText: {
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
    width: "60%",
  },
  skeletonInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skeletonRating: {
    height: 16,
    width: 60,
    borderRadius: 4,
  },
  skeletonDelivery: {
    height: 16,
    width: 100,
    borderRadius: 4,
  },
});
