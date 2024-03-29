import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledChildDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-indigo-700);
    font-size: 1.6rem;
    font-weight: 500;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("koushik395@gmail.com");
  const [password, setPassword] = useState("pass12345");
  const { login, isLoading } = useLogin();
  const { name } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <StyledDiv>
        <StyledChildDiv>
          <span>Not a Member?</span>
          <StyledNavLink to={`/signup/${name}`}>
            <span>Signup Now</span>
          </StyledNavLink>
        </StyledChildDiv>
        <StyledChildDiv>
          <span>Forgot your password?</span>
          <StyledNavLink to={`/forgotPassword/${name}`}>
            <span>Reset Now</span>
          </StyledNavLink>
        </StyledChildDiv>
      </StyledDiv>
    </Form>
  );
}

export default LoginForm;
