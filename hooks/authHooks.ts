import { useLogin, useUserProfile } from "@/features/auth/authQueries";
import { setCurrentUser } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

// Combines React Query + Redux logic
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const loginMutation = useLogin();

  const login = async (email: string, password: string) => {
    const user = await loginMutation.mutateAsync({ email, password });
    dispatch(setCurrentUser(user.id));
  };

  return { login };
};

export const useProfile = () => {
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  return useUserProfile(currentUserId!);
};
