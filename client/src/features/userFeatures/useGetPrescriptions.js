import { useQuery } from "@tanstack/react-query";
import { getMyPrescriptions } from "../../services/apiUserAuth";

export function useGetPrescriptions() {
  const { isLoading, data } = useQuery({
    queryKey: ["MyPrescriptions"],
    queryFn: getMyPrescriptions,
  });

  const prescriptions = data?.data?.data;
  return {
    isLoading,
    prescriptions,
  };
}
