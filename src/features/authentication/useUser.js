import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 mins
  });

  return {
    isLoading,
    user: data?.user,
    profile: data?.profile,
    role: data?.role,
    isAuthenticated: !!data?.user,
    error,
  };
}

export default useUser;
