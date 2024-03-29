import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useParams } from "react-router-dom";
import ForgotPassword from "../features/userFeatures/ForgotPassword";
import DoctorForgotPassword from "../features/doctorFeatures/ForgotPassword";

const PasswordForgotLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 70rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function PasswordForgot() {
  const { name } = useParams();
  console.log(name);
  return (
    <PasswordForgotLayout>
      <Logo />
      <Heading as="h4">Enter your registered Email address</Heading>
      {name === "patient" ? <ForgotPassword /> : <DoctorForgotPassword />}
    </PasswordForgotLayout>
  );
}

export default PasswordForgot;
