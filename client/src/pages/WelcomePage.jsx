import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Select Your role</Heading>
      <Button
        variations="secondary"
        onClick={() => navigate("/login/patient", { replace: true })}
      >
        Patient
      </Button>
      <Button onClick={() => navigate("/login/doctor", { replace: true })}>
        Doctor
      </Button>
    </LoginLayout>
  );
}

export default WelcomePage;
