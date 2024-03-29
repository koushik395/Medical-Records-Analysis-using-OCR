import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useParams } from "react-router-dom";
import ResetPassword from "../features/userFeatures/ResetPassword";
import DoctorResetPassword from "../features/doctorFeatures/ResetPassword";

const PasswordResetLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 70rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function PasswordReset() {
  const { name, token } = useParams();
  console.log(name, token);
  return (
    <PasswordResetLayout>
      <Logo />
      <Heading as="h4">Enter your new password</Heading>
      {name === "patient" ? <ResetPassword /> : <DoctorResetPassword />}
    </PasswordResetLayout>
  );
}

export default PasswordReset;
