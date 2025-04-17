import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DeliveryMethodSelector from "./DeliveryMethodSelector";
import LocationSelector from "./LocationSelector";
import LocationsModal from "../home/LocationsModal";
import { scaleHeight } from "@/utils/scaling";
import { useUserLocation } from "@/hooks/useCurrentLocation";
import { LocationData } from "@/features/location/location";
import {
  addLocation,
  updateLocation,
  setLocations,
  setSelectedLocation,
  removeLocation,
} from "@/features/location/locationSlice"; // Adjust path as needed
import { useAppSelector } from "@/hooks/useStore";

const Header = () => {
  const dispatch = useDispatch();
  const locations = useAppSelector((state) => state.locations.locations);
  const selectedLocation = useAppSelector(
    (state) => state.locations.selectedLocation
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const { locationData, isLoading } = useUserLocation();

  // Initialize locations when locationData changes
  useEffect(() => {
    if (locationData) {
      dispatch(setLocations(locationData));
    }
  }, [locationData, dispatch]);

  const onLocationPress = () => {
    setModalVisible(true);
  };

  const handleAddLocation = (newLocation: LocationData) => {
    dispatch(addLocation(newLocation));
  };

  const handleUpdateLocation = (updatedLocation: LocationData) => {
    dispatch(updateLocation(updatedLocation));
  };
  const handleDeleteLocation = (updatedAt: string) => {
    dispatch(removeLocation(updatedAt));
  };

  return (
    <View style={styles.header}>
      <DeliveryMethodSelector />
      <LocationSelector
        location={selectedLocation}
        isLoading={isLoading}
        onPress={onLocationPress}
      />
      <LocationsModal
        visible={isModalVisible}
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={(location) => dispatch(setSelectedLocation(location))}
        onAddLocation={handleAddLocation}
        onUpdateLocation={handleUpdateLocation}
        onDeleteLocation={handleDeleteLocation}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: scaleHeight(10),
  },
});

export default Header;
