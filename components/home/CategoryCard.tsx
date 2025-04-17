// components/home/CategoryCard.tsx
import React from "react";
import {
  Image,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  StyleProp,
  Pressable,
} from "react-native";
import { responsiveFont, scaleHeight, scaleWidth } from "@/utils/scaling";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, useRouter } from "expo-router";

interface CategoryCardProps {
  label: string;
  icon: ImageSourcePropType;
  promo?: boolean;
  variant?: "grid" | "horizontal";
  style?: StyleProp<ViewStyle>;
  columns?: number;
  path: Href;
}

const CategoryCard = ({
  label,
  icon,
  promo,
  variant = "grid",
  style,
  columns = 1,
  path,
}: CategoryCardProps) => {
  const isGrid = variant === "grid";
  const isMultiColumn = columns > 1;
  const backgroundColor = useThemeColor(
    { light: "#E6E6E6", dark: "#656565" },
    "background"
  );
  const router = useRouter();

  const handleNavigate = () => {
    console.log("navigate");
    router.push(path);
  };

  return (
    <Pressable onPress={handleNavigate} style={[styles.container, style]}>
      <>
        <ThemedView
          style={[
            { backgroundColor },
            styles.card,
            isGrid ? styles.grid : styles.horizontal,
            isMultiColumn && styles.multiColumnCard,
          ]}
        >
          {promo && (
            <ThemedView style={styles.promoBadge}>
              <ThemedText style={styles.promoText}>Promo</ThemedText>
            </ThemedView>
          )}
          <Image
            source={icon}
            style={[
              styles.icon,
              isMultiColumn && styles.multiColumnIcon,
              !isMultiColumn && styles.singleColumnIcon,
            ]}
            resizeMode="contain"
          />
          {isMultiColumn && (
            <ThemedText
              style={[styles.label, styles.multiColumnLabel]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}
            </ThemedText>
          )}
        </ThemedView>

        {/* External Label for Single Column */}
        {!isMultiColumn && (
          <ThemedText
            style={[styles.label, styles.externalLabel]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </ThemedText>
        )}
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    borderRadius: scaleWidth(12),
    alignItems: "center",
    justifyContent: "center",
    padding: scaleWidth(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
    width: "100%",
  },
  grid: {},
  horizontal: {
    width: scaleWidth(80),
    height: scaleHeight(110),
    marginRight: scaleWidth(12),
  },
  multiColumnCard: {
    height: scaleHeight(75),
    justifyContent: "space-between",
    padding: scaleWidth(15),
    alignItems: "flex-start",
  },
  icon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
  },
  singleColumnIcon: {
    marginBottom: 0,
  },
  multiColumnIcon: {
    position: "absolute",
    top: scaleHeight(10),
    right: scaleWidth(10),
    width: scaleWidth(30),
    height: scaleWidth(30),
  },
  label: {
    fontWeight: "700",
  },
  multiColumnLabel: {
    fontSize: responsiveFont(14),
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: "auto",
    marginBottom: -scaleHeight(5),
  },
  externalLabel: {
    fontSize: responsiveFont(11.25),
    marginTop: scaleHeight(6),
    textAlign: "center",
    maxWidth: "90%",
  },
  promoBadge: {
    position: "absolute",
    top: -scaleHeight(7),
    left: "50%",
    backgroundColor: "#4CAF50",
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(8),
    zIndex: 1,
    transform: [{ translateX: -scaleWidth(8) }],
  },
  promoText: {
    fontSize: responsiveFont(12),
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});

export default CategoryCard;
