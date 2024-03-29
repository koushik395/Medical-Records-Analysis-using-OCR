import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadPrescription as uploadUserPrescription } from "../../services/apiUserAuth.js";
import { useAuth } from "../../context/auth.jsx";

export function useUploadPrescription() {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();
  let user;
  const { mutate: uploadPrescription, isLoading: isUploading } = useMutation({
    mutationFn: uploadUserPrescription,
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success("Prescription uploaded successfully!");
      user = data.user;
      setAuth({
        ...auth,
        user,
      });
      queryClient.invalidateQueries("user");
    },
  });

  return { uploadPrescription, isUploading };
}
