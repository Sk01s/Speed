import { formatLocationDetails } from "@/utils";

// services/location.ts
type OpenCageResult = {
  formatted: string;
  components: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    village?: string;
    town?: string;
    [key: string]: any;
  };
};

type OpenCageResponse = {
  results: OpenCageResult[];
  rate?: {
    limit: number;
    remaining: number;
    reset: number;
  };
};

type GeoCodeOptions = {
  skipUnnamedCheck?: boolean;
};
export type LocationData = {
  coords: {
    latitude: number;
    longitude: number;
  };
  locationName: string;
  details: OpenCageResult["components"];
  updatedAt: string;
};

export const getUserLocation = async (
  userId: string
): Promise<LocationData[]> => {
  const response = await fetch(`/users/${userId}/location`);
  return response.json();
};
type GeoCodeResult = {
  locationName: string;
  details: OpenCageResult["components"];
};
export const saveUserLocation = async (
  userId: string,
  locationData: LocationData[]
) => {
  const response = await fetch(`/users/${userId}/location`, {
    body: JSON.stringify(locationData),
  });
  return response.json();
};
export const reverseGeocode = async (
  coords: { latitude: number; longitude: number },
  options?: GeoCodeOptions
): Promise<GeoCodeResult> => {
  const { latitude, longitude } = coords;
  const key = process.env.EXPO_PUBLIC_GEOCODING_API_KEY;

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}&no_annotations=1&language=en`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Geocoding failed: ${errorData.status.message}`);
    }

    const data: OpenCageResponse = await response.json();

    if (data.rate && data.rate.remaining < 10) {
      console.warn(`Low API credits remaining: ${data.rate.remaining}`);
    }

    if (!data.results?.length)
      return {
        locationName: "Unknown location",
        details: {},
      };

    const result = data.results[0];
    const { components, formatted } = result;

    if (
      !options?.skipUnnamedCheck &&
      isUnnamedLocation(components, formatted)
    ) {
      return {
        locationName: formatLocationDetails(components),
        details: components,
      };
    }

    return {
      locationName: formatLocationDetails(components),
      details: components,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      locationName: "Unknown location",
      details: {},
    };
  }
};

// Helper functions
const isUnnamedLocation = (
  components: OpenCageResult["components"],
  formatted: string
): boolean => {
  const hasUnnamedRoad = components.road?.toLowerCase().includes("unnamed");
  const formattedHasUnnamed = formatted.toLowerCase().includes("unnamed road");
  return !!hasUnnamedRoad || formattedHasUnnamed;
};

const formatFallbackLocation = (
  components: OpenCageResult["components"]
): string => {
  const parts = [
    components.suburb,
    components.city,
    components.village,
    components.town,
    components.state,
  ].filter(Boolean);

  return parts.length > 0
    ? Array.from(new Set(parts)).join(", ") // Remove duplicates
    : "Unknown location";
};

const cleanFormattedAddress = (formatted: string, country?: string): string => {
  let cleaned = formatted;
  if (country && cleaned.includes(country)) {
    cleaned = cleaned.replace(`, ${country}`, "").replace(country, "").trim();
  }
  return cleaned.replace(/,\s*,/g, ",").replace(/,+$/, "").trim();
};
