import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword as updateCurrentPassword } from "../../services/apiDoctorAuth";
import { useAuth } from "../../context/auth";
export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();

  const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentPassword,
    onSuccess: ({ data }) => {
      console.log("updatepass", data);
      let user, token;
      toast.success("Password Successfully updated! ");
      user = data.data.doctor;
      token = data.token;
      setAuth({
        ...auth,
        user,
        token,
      });
      queryClient.invalidateQueries("user");
    },
  });

  return { updatePassword, isUpdating };
}
