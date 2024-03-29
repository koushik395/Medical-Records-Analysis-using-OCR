import styled from "styled-components";
import PrescriptionCard from "./PrescriptionCard";
import PatientHealthInfo from "./PatientHealthInfo";

const StyledCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  height: 33rem;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

function PatientMedicalHistory({ healthReport }) {
  const prescription = healthReport.prescription;
  return (
    <StyledCard>
      <PrescriptionCard prescription={prescription} />
      <PatientHealthInfo data={healthReport} />
    </StyledCard>
  );
}

export default PatientMedicalHistory;
