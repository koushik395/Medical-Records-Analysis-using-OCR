import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiDoctorAuth";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: ({ data }) => {
      let user, token;
      user = data.data.doctor;
      token = data.token;
      setAuth({
        ...auth,
        user,
        token,
      });
      toast.success("Account successfully created!");
      navigate("/dashboard", { replace: true });
    },
  });

  return { signup, isLoading };
}
