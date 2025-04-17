// screens/CategoriesScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CategoryCardContainer, {
  CategoryItem,
} from "@/components/home/CategoryCardContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeScreen } from "@/components/auth/SafeScreen";

const categoryData: CategoryItem[] = [
  // First Row
  {
    label: "Convenience",
    icon: require("@/assets/icons/convenience.png"),
    path: {
      pathname: "/browse/[category]",
      params: { category: "convenience" },
    },
  },
  {
    label: "Alcohol",
    icon: require("@/assets/icons/alcohol.png"),
    path: { pathname: "/browse/[category]", params: { category: "alcohol" } },
  },
  {
    label: "Pet Supplies",
    icon: require("@/assets/icons/pet-supplies.png"),
    path: {
      pathname: "/browse/[category]",
      params: { category: "pet-supplies" },
    },
  },
  {
    label: "Flowers",
    icon: require("@/assets/icons/flowers.png"),
    path: { pathname: "/browse/[category]", params: { category: "flowers" } },
  },

  // Second Row
  {
    label: "Grocery",
    icon: require("@/assets/icons/grocery.png"),
    path: { pathname: "/browse/[category]", params: { category: "grocery" } },
  },
  {
    label: "American",
    icon: require("@/assets/icons/american.png"),
    path: { pathname: "/browse/[category]", params: { category: "american" } },
  },
  {
    label: "Specialty",
    icon: require("@/assets/icons/specialty.png"),
    path: { pathname: "/browse/[category]", params: { category: "specialty" } },
  },
  {
    label: "Takeout",
    icon: require("@/assets/icons/takeout.png"),
    path: { pathname: "/browse/[category]", params: { category: "takeout" } },
  },

  // Third Row
  {
    label: "Asian",
    icon: require("@/assets/icons/asian.png"),
    path: { pathname: "/browse/[category]", params: { category: "asian" } },
  },
  {
    label: "Ice Cream",
    icon: require("@/assets/icons/ice-cream.png"),
    path: { pathname: "/browse/[category]", params: { category: "ice-cream" } },
  },
  {
    label: "Halal",
    icon: require("@/assets/icons/halal.png"),
    path: { pathname: "/browse/[category]", params: { category: "halal" } },
  },
  {
    label: "Retails",
    icon: require("@/assets/icons/retails.png"),
    path: { pathname: "/browse/[category]", params: { category: "retails" } },
  },

  // Fourth Row
  {
    label: "Carribean",
    icon: require("@/assets/icons/carribean.png"),
    path: { pathname: "/browse/[category]", params: { category: "carribean" } },
  },
  {
    label: "Indian",
    icon: require("@/assets/icons/indian.png"),
    path: { pathname: "/browse/[category]", params: { category: "indian" } },
  },
  {
    label: "French",
    icon: require("@/assets/icons/french.png"),
    path: { pathname: "/browse/[category]", params: { category: "french" } },
  },
  {
    label: "Fast Foods",
    icon: require("@/assets/icons/fast-foods.png"),
    path: {
      pathname: "/browse/[category]",
      params: { category: "fast-foods" },
    },
  },

  // Fifth Row
  {
    label: "Burger",
    icon: require("@/assets/icons/burger.png"),
    path: { pathname: "/browse/[category]", params: { category: "burger" } },
  },
  {
    label: "Ride",
    icon: require("@/assets/icons/ride.png"),
    path: { pathname: "/browse/[category]", params: { category: "ride" } },
  },
  {
    label: "Chinese",
    icon: require("@/assets/icons/chinese.png"),
    path: { pathname: "/browse/[category]", params: { category: "chinese" } },
  },
  {
    label: "Dessert",
    icon: require("@/assets/icons/dessert.png"),
    path: { pathname: "/browse/[category]", params: { category: "dessert" } },
  },
];

const CategoriesScreen = () => {
  return (
    <SafeScreen>
      <ThemedView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedText type="text-3xl" style={styles.title}>
            All categories
          </ThemedText>

          <CategoryCardContainer
            data={categoryData}
            variant="grid"
            style={styles.gridContainer}
          />
        </ScrollView>
      </ThemedView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  gridContainer: {
    paddingBottom: 32,
  },
});

export default CategoriesScreen;
