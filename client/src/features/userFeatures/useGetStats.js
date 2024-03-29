import { useQuery } from "@tanstack/react-query";
import { getMyStats } from "../../services/apiUserAuth";

export function useGetStats() {
  const { isLoading, data } = useQuery({
    queryKey: ["stats"],
    queryFn: getMyStats,
  });
  const stats = data?.data?.user[0]?.healthReport;
  return {
    isLoading,
    stats,
  };
}
