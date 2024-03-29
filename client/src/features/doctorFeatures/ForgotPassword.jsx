import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForgotPassword } from "./useForgotPassword";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("koushik395@gmail.com");
  const { forgotPassword, isLoading } = useForgotPassword();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    forgotPassword(
      { email },
      {
        onSettled: () => {
          setEmail("");
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
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRow>
        <Button
          type="reset"
          variations="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Send Link" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ForgotPassword;
