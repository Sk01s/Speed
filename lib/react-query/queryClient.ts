import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create persister for caching queries
export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// Configure query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours cache
      staleTime: 1000 * 60 * 5, // 5 minutes stale data
    },
  },
});
