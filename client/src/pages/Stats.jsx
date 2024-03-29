import StatsTable from "../features/dashboard/StatsTable";
import { useGetStats } from "../features/userFeatures/useGetStats";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";

function Stats() {
  const { isLoading, stats } = useGetStats();
  if (isLoading) return <Spinner />;
  if (!stats) return <Heading as="h2">No Stats found</Heading>;

  return (
    <>
      <Heading as="h1">Stats</Heading>
      <StatsTable stats={stats} />
    </>
  );
}

export default Stats;
