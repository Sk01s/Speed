import { LocationData } from "@/features/location/location";

export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Remove spaces, dashes, parentheses
  const cleaned = phoneNumber.replace(/[\s()-]/g, "");

  // Match pattern: starts with +, followed by 7 to 15 digits
  const regex = /^\+\d{7,15}$/;

  return regex.test(cleaned);
}
export const formatLocationDetails = (details: LocationData["details"]) => {
  const parts = [];
  if (details.building && !details.building.toLowerCase().includes("unnamed"))
    parts.push(details.building);
  if (details.road && !details.road.toLowerCase().includes("unnamed"))
    parts.push(details.road);
  if (details.city && !details.city.toLowerCase().includes("unnamed"))
    parts.push(details.city);

  return parts.join(", ") || "Location details unavailable";
};
