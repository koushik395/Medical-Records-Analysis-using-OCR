import styled from "styled-components";
import { useAuth } from "../context/auth";
import DashboardTable from "../features/dashboard/DashboardTable";
import PatientMedicalHistory from "../features/dashboard/PatientMedicalHistory";
import Heading from "../ui/Heading";

const StyledDiv = styled.div`
  display: flex;
  gap: 2.3rem;
`;

function Patient() {
  const { auth } = useAuth();
  const currentPatient = auth.currentPatient;
  const healthReport = currentPatient.healthReport;
  return (
    <>
      <Heading as="h1">Patient Details</Heading>
      <DashboardTable user={currentPatient} />
      <StyledDiv>
        <Heading as="h2">Patient Medical History</Heading>
        <Heading as="h3">Found {healthReport.length} records</Heading>
      </StyledDiv>
      {healthReport.map((health, i) => {
        return <PatientMedicalHistory healthReport={health} key={i} />;
      })}
    </>
  );
}

export default Patient;
