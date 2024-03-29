import styled from "styled-components";
import Heading from "../../ui/Heading";
import { getMonthName, addSuperscriptToDate } from "../../utils/helpers";
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfo = styled.div`
  height: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.6rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  margin-top: 1.8rem;
  margin-right: 1.5rem;
`;

const StyledHealthStatus = styled.div`
  text-align: justify;
  height: 22rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: 1.6rem;
  margin: 1.6rem 0;
  margin-right: 1.5rem;
  overflow: scroll;
`;

function PatientHealthInfo({ data }) {
  const date = data.date;
  const year = data.year;
  const month = data.month;
  const healthStatus = data.healthStatus;
  return (
    <StyledDiv>
      <StyledInfo>
        <p>
          <strong>Date:</strong> {date}
          <sup>{addSuperscriptToDate(date)}</sup>
        </p>
        <p>
          <strong>Month:</strong> {getMonthName(month)}
        </p>
        <p>
          <strong>Year:</strong> {year}
        </p>
      </StyledInfo>
      <StyledHealthStatus>
        <Heading as="h2" style={{ textAlign: "center" }}>
          Medical condition observed
        </Heading>
        <p>{healthStatus}</p>
      </StyledHealthStatus>
    </StyledDiv>
  );
}

export default PatientHealthInfo;
