import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // React Native storage
import authReducer from "@/features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage for React Native
  whitelist: ["auth"], // Persist only auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default persistReducer(persistConfig, rootReducer);
