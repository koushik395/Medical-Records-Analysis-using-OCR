import styled from "styled-components";
import SignupForm from "../features/userFeatures/SignupForm";
import DoctorSignupForm from "../features/doctorFeatures/SignupForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useParams } from "react-router-dom";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 70rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { name } = useParams();
  console.log(name);
  return (
    <SignupLayout>
      <Logo />
      <Heading as="h4">Register to your account</Heading>
      {name === "patient" ? <SignupForm /> : <DoctorSignupForm />}
    </SignupLayout>
  );
}

export default Login;
