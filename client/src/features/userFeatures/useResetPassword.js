import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiUserAuth.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: ({ data }) => {
      let user, token;
      user = data.user;
      token = data.token;
      setAuth({
        ...auth,
        user,
        token,
      });
      toast.success("Password reset successfully!");
      navigate("/dashboard", { replace: true });
    },
  });

  return { resetPassword, isLoading };
}
