import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateCurrentUser } from "../../services/apiDoctorAuth";
import { useAuth } from "../../context/auth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ data }) => {
      let user = data.data.doctor;
      toast.success("User Successfully updated! ");
      setAuth({
        ...auth,
        user,
      });
      queryClient.invalidateQueries("user");
    },
  });

  return { updateUser, isUpdating };
}
