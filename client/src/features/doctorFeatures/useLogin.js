import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiDoctorAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.jsx";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (body) => loginApi(body),
    onSuccess: ({ data }) => {
      setAuth({
        ...auth,
        user: data.data.doctor,
        token: data.token,
      });

      toast.success("Logged in successfully");
      queryClient.setQueryData(["user"], data.data.doctor);
      navigate("/dashboard", { replace: true });
    },
  });

  return { login, isLoading };
}
