import React from "react";
import {
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Image } from "expo-image";
interface RestaurantCardProps {
  imageUrl: string;
  name: string;
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  isFavorite?: boolean;
  onToggleFavorite: () => void; // Add this prop
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  imageUrl,
  name,
  rating,
  deliveryFee,
  deliveryTime,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const textColor = useThemeColor({}, "text");
  const ratingColor = useThemeColor(
    { light: "#E6E6E6", dark: "#656565" },
    "background"
  );
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  return (
    <Pressable style={[styles.card, { backgroundColor }]}>
      <ThemedView>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.favoriteIcon}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : iconColor}
          />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="text-xl">{name}</ThemedText>
        <ThemedText type="text-sub">
          {deliveryFee} Delivery Fee • {deliveryTime}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={[styles.ratingContainer, { backgroundColor: ratingColor }]}
      >
        <ThemedText style={[styles.rating, { color: textColor }]}>
          {rating.toFixed(1)}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 999,
    padding: 6,
  },
  infoContainer: {
    padding: 12,
  },

  ratingContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
    paddingHorizontal: 5,
    paddingVertical: 5,
    aspectRatio: 1,
    borderRadius: "50%",
  },
  rating: {
    fontWeight: "600",
    fontSize: 14,
  },
});
