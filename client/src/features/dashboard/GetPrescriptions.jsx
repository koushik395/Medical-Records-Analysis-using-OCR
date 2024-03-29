import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledDiv = styled.div`
  width: 300px;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledChildren = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function GetPrescriptions() {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <StyledChildren>
        <Heading as="h2">Click below to get all your prescriptions</Heading>
        <StyledDiv>
          <Button
            variations="danger"
            onClick={() => navigate("/prescriptions", { replace: true })}
          >
            Get my prescriptions
          </Button>
        </StyledDiv>
      </StyledChildren>
      <StyledChildren>
        <Heading as="h2">Click below to get your health stats</Heading>
        <StyledDiv>
          <Button onClick={() => navigate("/stats", { replace: true })}>
            Get my stats
          </Button>
        </StyledDiv>
      </StyledChildren>
    </StyledWrapper>
  );
}

export default GetPrescriptions;
