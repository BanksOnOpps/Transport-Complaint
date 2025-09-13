import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import supabase from "../../services/supabase";

export function useLogin(expectedRole) {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: async (result) => {
      // Fetch the profile with role
      const userId = result?.user?.id;
      if (!userId) {
        toast.error("Login succeeded but no user ID returned.");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
      console.log(userId);
      console.log("Fetched profile:", profile);
      if (error) {
        toast.error("Failed to fetch user profile.");
        return;
      }

      // Optional: save role to localStorage, context, or state
      const role = profile.role;
      console.log("Fetched role:", role);

      if (role !== expectedRole) {
        toast.error(`You are not an ${expectedRole}.`);
        return;
      }

      // Redirect based on role

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "student") {
        navigate("/dashboard");
      } else {
        toast.error("Unknown role");
      }
    },
    onError: (err) => {
      toast.error("Login failed: " + err.message);
    },
  });

  return { login, isLoading };
}
