import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate, useLocation } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current route
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();

      const isAdmin = location.pathname.startsWith("/admin"); // 👈 check current route
      navigate(isAdmin ? "/admin/login" : "/login", { replace: true });
    },
  });

  return { logout, isLoading };
}

export default useLogout;
