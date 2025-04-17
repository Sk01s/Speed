import { useMutation, useQuery } from "@tanstack/react-query";

const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Query hooks
export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
  });
};

export const useUserProfile = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    },
    enabled: !!userId, // <-- disables the query if userId is falsy
  });
};
