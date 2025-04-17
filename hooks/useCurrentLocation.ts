import { useQuery, useMutation } from "@tanstack/react-query";
import * as Location from "expo-location";
import {
  getUserLocation,
  saveUserLocation,
  reverseGeocode,
  LocationData,
} from "@/features/location/location";
import { useAppSelector } from "./useStore";
import { queryClient } from "@/lib/react-query/queryClient";

export const useUserLocation = () => {
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);

  // Common device location fetcher
  const getDeviceLocation = async (): Promise<LocationData[]> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") throw new Error("Location permission denied");

    const location =
      (await Location.getLastKnownPositionAsync()) ||
      (await Location.getCurrentPositionAsync({}));

    const { locationName, details } = await reverseGeocode({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return [
      {
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        locationName,
        details,
        updatedAt: new Date().toISOString(),
      },
    ];
  };

  // Query for logged-in users (disabled when no user)
  const userLocationQuery = useQuery<LocationData[]>({
    queryKey: ["userLocation", currentUserId],
    queryFn: () => getUserLocation(currentUserId!),
    enabled: !!currentUserId,
    staleTime: 3600000,
  });

  // Query for guests (disabled when user exists)
  const deviceLocationQuery = useQuery<LocationData[]>({
    queryKey: ["deviceLocation"],
    queryFn: getDeviceLocation,
    enabled: !currentUserId,
    staleTime: 3600000,
  });

  // Unified mutation handler
  const saveLocationMutation = useMutation({
    mutationFn: (locationData: LocationData[]) =>
      currentUserId
        ? saveUserLocation(currentUserId, locationData)
        : Promise.resolve(locationData),
    onSuccess: (data) => {
      if (currentUserId) {
        queryClient.setQueryData(["userLocation", currentUserId], data);
      }
    },
  });

  // Determine which data source to use
  const locationData = currentUserId
    ? userLocationQuery.data
    : deviceLocationQuery.data;
  const isLoading = currentUserId
    ? userLocationQuery.isLoading
    : deviceLocationQuery.isLoading;
  const error = currentUserId
    ? userLocationQuery.error
    : deviceLocationQuery.error;

  // Refresh logic
  const refresh = async () => {
    const freshLocation = await getDeviceLocation();
    await saveLocationMutation.mutateAsync(freshLocation);
    return freshLocation;
  };

  return {
    locationData,
    isLoading,
    error,
    refresh,
  };
};
