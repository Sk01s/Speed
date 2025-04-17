import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RestaurantCard } from "./RestaurantCard";
import { useRestaurantsQuery } from "@/features/Restaurant/restaurantQueries";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import {
  // setRestaurants,
  toggleFavorite,
} from "@/features/Restaurant/restaurantSlice";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { ErrorView } from "../ErrorView";

export interface Restaurant {
  id: string;
  imageUrl: string;
  name: string;
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  isFavorite?: boolean;
}

interface RestaurantListProps {}

export const RestaurantList: React.FC<RestaurantListProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useRestaurantsQuery();
  const filters = useAppSelector((state) => state.restaurants.filters);
  const searchQuery = useAppSelector((state) => state.restaurants.searchQuery);
  const sortBy = useAppSelector((state) => state.restaurants.sortBy);
  const favorites = useAppSelector((state) => state.restaurants.favorites);

  // Merge server data with client state (favorites)
  const processedRestaurants =
    data?.map((restaurant) => ({
      ...restaurant,
      isFavorite: favorites.includes(restaurant.id),
    })) || [];

  // Filtering and sorting logic
  const filteredRestaurants = processedRestaurants
    .filter((restaurant) => {
      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCuisine = filters.cuisine.length === 0;
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "deliveryTime")
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      return 0;
    });

  const handleToggleFavorite = (restaurantId: string) => {
    dispatch(toggleFavorite(restaurantId));
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorView message={error.message} />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          {...restaurant}
          onToggleFavorite={() => handleToggleFavorite(restaurant.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
