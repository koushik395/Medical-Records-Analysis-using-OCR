import { useMutation } from "@tanstack/react-query";
import { getPatient } from "../../services/apiDoctorAuth";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export function useGetPatient() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: getPatientApi, isLoading } = useMutation({
    mutationFn: getPatient,
    onSuccess: ({ data }) => {
      let currentPatient;
      currentPatient = data.user[0];
      setAuth({
        ...auth,
        currentPatient,
      });
      toast.success("Patient details fetched successfully!..");
      navigate("/patient", { replace: true });
    },
  });

  return { getPatientApi, isLoading };
}
