import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateCurrentUser } from "../../services/apiUserAuth.js";
import { useAuth } from "../../context/auth.jsx";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();
  let user;
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ data }) => {
      toast.success("User Successfully updated! ");
      user = data.data.user;
      setAuth({
        ...auth,
        user,
      });
      queryClient.invalidateQueries("user");
    },
  });

  return { updateUser, isUpdating };
}
