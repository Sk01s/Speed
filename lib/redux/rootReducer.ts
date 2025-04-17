// store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "@/features/auth/authSlice";
import authFormReducer from "@/features/auth/authFormSlice"; // New slice for form state
import locationReducer from "@/features/location/locationSlice";
import restaurantSlice from "@/features/Restaurant/restaurantSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "location", "restaurants"], // Only persist the authenticated user
};

const rootReducer = combineReducers({
  auth: authReducer, // persisted
  authForm: authFormReducer, // volatile form data (not persisted)
  // Add other reducers here
  locations: locationReducer,
  restaurants: restaurantSlice,
});

export default persistReducer(persistConfig, rootReducer);
