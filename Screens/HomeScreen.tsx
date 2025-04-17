import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Header from "@/components/home/Header";
import { SafeScreen } from "@/components/auth/SafeScreen";
import { scaleWidth } from "@/utils/scaling";
import CategoryCardContainer, {
  CategoryItem,
} from "@/components/home/CategoryCardContainer";

import { RestaurantList } from "@/components/home/RestaurantList";
import PromoSection from "@/components/home/PromoSection";
import Map from "@/components/Map";

const categoryData: CategoryItem[] = [
  {
    label: "American",
    icon: require("@/assets/icons/hotdog.png"),
    columns: 2,
    path: "/auth",
  },
  {
    label: "Grocery",
    icon: require("@/assets/icons/hotdog.png"),
    columns: 2,

    promo: true,
    path: "/",
  },
  {
    label: "Convenience",
    icon: require("@/assets/icons/hotdog.png"),
    path: "/",
  },
  {
    label: "Alcohol",
    icon: require("@/assets/icons/hotdog.png"),
    path: "/",
  },
  {
    label: "Pet Supplies",
    icon: require("@/assets/icons/hotdog.png"),
    path: "/",
  },
  {
    label: "More",
    icon: require("@/assets/icons/hotdog.png"),
    path: "/categories",
  },
];

const restaurantPromos = [
  {
    title: "Weekend Special",
    description: "30% off all breakfast items",
    image: require("@/assets/images/icon.png"),
    ctaText: "Grab Deal",
    backgroundColor: "#D2D7F0",
  },
  {
    title: "Family Bundle",
    description: "Feed 4 people for $25",
    image: require("@/assets/images/icon.png"),
    backgroundColor: "#D2D7F0",
    ctaText: "Order Now",
  },
];
const HomeScreen = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  return (
    <SafeScreen>
      <ScrollView
        scrollEnabled={scrollEnabled}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
      >
        <Header />
        <CategoryCardContainer data={categoryData} />
        <RestaurantList />
        <PromoSection promos={restaurantPromos} />
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: scaleWidth(16),
  },
  contentPlaceholder: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
