import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiUserAuth.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setAuth({
        ...auth,
        user: null,
        currentPatient: null,
        token: "",
      });
      localStorage.removeItem("auth");
      queryClient.removeQueries();
      toast.success("Logged out successfully");
      navigate("/welcome", { replace: true });
    },
  });

  return { logout, isLoading };
}
