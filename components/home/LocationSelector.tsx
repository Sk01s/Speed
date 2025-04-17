// components/home/LocationSelector.tsx
import React, { useState, useEffect, useRef } from "react"; // Import useState
import {
  StyleSheet,
  Pressable,
  // Animated // No longer needed for this version of LoadingText
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { responsiveFont, scaleWidth } from "@/utils/scaling";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LocationData } from "@/features/location/location";

type LocationSelectorProps = {
  location: LocationData | null;
  isLoading: boolean;
  onPress?: () => void;
};

// Animated Ellipsis Loading Text component
const LoadingText = () => {
  const [dots, setDots] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the interval
    intervalRef.current = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, 300); // Adjust speed as needed

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Use ThemedText directly for consistency
    <ThemedText style={styles.locationText}>Loading{dots}</ThemedText>
  );
};

const LocationSelector = ({
  location,
  onPress,
  isLoading,
}: LocationSelectorProps) => {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  // console.log(location);

  return (
    <Pressable style={styles.container} onPress={onPress} disabled={isLoading}>
      <Pressable
        style={styles.locationContainerTouchable}
        onPress={onPress}
        disabled={isLoading}
      >
        <ThemedText style={styles.nowText}>Now •</ThemedText>
        {isLoading ? (
          <LoadingText /> // Use the new LoadingText
        ) : (
          <ThemedText style={styles.locationText} numberOfLines={1}>
            {location?.locationName || "Select Location"}
          </ThemedText>
        )}
        {!isLoading && (
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={iconColor}
            style={styles.icon}
          />
        )}
      </Pressable>

      <Pressable style={styles.filterButton} onPress={onPress}>
        <Ionicons name="options-outline" color={textColor} size={22} />
      </Pressable>
    </Pressable>
  );
};

// Styles remain largely the same as in Option 1,
// just ensure `locationText` style works for LoadingText too.
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  locationContainerTouchable: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  // No loadingContainer needed here if using LoadingText
  nowText: {
    fontSize: responsiveFont(16),
    color: "#888",
    marginRight: 5,
  },
  locationText: {
    // Style applies to both real location and "Loading..."
    fontSize: responsiveFont(16),
    fontWeight: "600",
    textAlign: "left", // Ensure dots appear on the right
    maxWidth: scaleWidth(180),
  },
  icon: {
    marginLeft: 4,
  },
  filterButton: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    padding: 1,
  },
});

export default LocationSelector;
