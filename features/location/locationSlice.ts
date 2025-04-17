import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationData } from "./location";

interface LocationsState {
  locations: LocationData[];
  selectedLocation: LocationData | null;
}

const initialState: LocationsState = {
  locations: [],
  selectedLocation: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<LocationData>) => {
      state.locations.unshift(action.payload);
      state.selectedLocation = action.payload;
    },
    updateLocation: (state, action: PayloadAction<LocationData>) => {
      const index = state.locations.findIndex(
        (loc) => loc.updatedAt === action.payload.updatedAt
      );
      if (index !== -1) {
        state.locations[index] = action.payload;
        state.selectedLocation = action.payload;
      }
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (loc) => loc.updatedAt !== action.payload
      );
      if (state.selectedLocation?.updatedAt === action.payload) {
        state.selectedLocation = state.locations[0] || null;
      }
    },
    setLocations: (state, action: PayloadAction<LocationData[]>) => {
      state.locations = action.payload;
      state.selectedLocation = action.payload[0] || null;
    },
    setSelectedLocation: (state, action: PayloadAction<LocationData>) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const {
  addLocation,
  updateLocation,
  removeLocation,
  setLocations,
  setSelectedLocation,
} = locationsSlice.actions;
export default locationsSlice.reducer;
