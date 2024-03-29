import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiUserAuth.js";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success("Password recent link sent successfully to your mail!");
    },
  });

  return { forgotPassword, isLoading };
}
