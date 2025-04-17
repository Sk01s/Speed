// src/api/restaurants.ts
import { useQuery } from "@tanstack/react-query";

// Define the Restaurant interface
export interface Restaurant {
  id: string;
  imageUrl: string;
  name: string;
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  isFavorite: boolean;
  cuisine?: string;
}

const mockData: Restaurant[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    name: "Adenine Kitchen",
    rating: 4.4,
    deliveryFee: "$0.29",
    deliveryTime: "10–25 min",
    isFavorite: true,
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1733503711073-2b1c1357a949?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cardinal Chips",
    rating: 4.3,
    deliveryFee: "$0.29",
    deliveryTime: "10–25 min",
    isFavorite: false,
  },
  // Add more...
];

const fetchRestaurants = async () => {
  const response = await fetch("https://api.your-service.com/restaurants");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  await setTimeout(() => {}, 10000);
  return response.json() as Promise<Restaurant[]>;
};

export const useRestaurantsQuery = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
    initialData: mockData,
  });
};
