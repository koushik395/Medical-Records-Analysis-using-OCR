import styled from "styled-components";
import { useAuth } from "../context/auth";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const StyledSpan = styled.span`
  text-transform: capitalize;
`;

function Dashboard() {
  const { auth } = useAuth();
  const role = auth.user.role;
  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Dashboard</Heading>
        <Heading as="h3">
          <StyledSpan>{role}</StyledSpan> details
        </Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
