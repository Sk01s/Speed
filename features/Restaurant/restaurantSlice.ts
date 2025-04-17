import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RestaurantState {
  filters: {
    cuisine: string[];
    priceRange: [number, number];
  };
  searchQuery: string;
  sortBy: "rating" | "deliveryTime";
  favorites: string[];
}

const initialState: RestaurantState = {
  filters: {
    cuisine: [],
    priceRange: [0, 50],
  },
  searchQuery: "",
  sortBy: "rating",
  favorites: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<RestaurantState["filters"]>) => {
      state.filters = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<RestaurantState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const { setFilters, setSearchQuery, setSortBy, toggleFavorite } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
