import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { scaleWidth, scaleHeight, responsiveFont } from "@/utils/scaling";
import PromoCard, { PromoCardProps } from "./PromoCard";

interface PromoSectionProps {
  promos: PromoCardProps[];
}

const PromoSection = ({ promos }: PromoSectionProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {promos.map((promo, index) => (
        <PromoCard
          backgroundColor={promo.backgroundColor}
          key={`promo-${index}`}
          title={promo.title}
          image={promo.image}
          ctaText={promo.ctaText}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: scaleHeight(30),
    paddingLeft: scaleWidth(16),
  },
  header: {
    marginBottom: scaleHeight(20),
    paddingRight: scaleWidth(16),
  },
  headerTop: {
    fontSize: responsiveFont(14),
    marginBottom: scaleHeight(4),
  },
  headerBottom: {
    fontSize: responsiveFont(22),
    fontWeight: "700",
  },
  scrollContent: {
    paddingBottom: scaleHeight(20),
  },
});

export default PromoSection;
