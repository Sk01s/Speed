import React from "react";
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { scaleWidth, scaleHeight, responsiveFont } from "@/utils/scaling";
import { Colors } from "@/constants/Colors";

export interface PromoCardProps {
  title: string;
  image: ImageSourcePropType;
  backgroundColor?: string;
  ctaText: string;
}

const PromoCard = ({
  title,
  image,
  ctaText,
  backgroundColor,
}: PromoCardProps) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: backgroundColor || Colors.light.background },
      ]}
    >
      {/* Left Content */}
      <View style={styles.textContainer}>
        <Text style={[styles.cardTitle, { color: Colors.light.text }]}>
          {title}
        </Text>

        <TouchableOpacity
          style={[
            styles.ctaButton,
            { backgroundColor: Colors.light.buttonText },
          ]}
        >
          <View style={styles.buttonContent}>
            <Text
              style={[styles.ctaText, { color: Colors.light.buttonBackground }]}
            >
              {ctaText}
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={responsiveFont(18)}
              color={Colors.light.buttonBackground}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Right Image */}
      <Image source={image} style={styles.cardImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scaleWidth(300),
    height: scaleHeight(160),
    borderRadius: scaleWidth(12),
    marginRight: scaleWidth(16),
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: scaleWidth(16),
    marginRight: scaleWidth(16),
  },
  cardTitle: {
    fontSize: responsiveFont(18),
    fontFamily: "Inter_700Bold",
  },
  ctaButton: {
    padding: 8,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleWidth(8),
  },
  ctaText: {
    fontSize: responsiveFont(14),
    fontWeight: "600",
    textAlign: "center",
  },
  cardImage: {
    width: scaleWidth(120),
    height: "100%",
    borderRadius: scaleWidth(8),
  },
});

export default PromoCard;
