import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdatePassword } from "./useUpdatePassword";

function UpdateDoctorPasswordForm() {
  const { updatePassword, isUpdating } = useUpdatePassword();

  const [passwordCurrent, setpasswordCurrent] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!passwordCurrent || !password || !passwordConfirm) return;
    updatePassword(
      { passwordCurrent, password, passwordConfirm },
      {
        onSuccess: () => {
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    setpasswordCurrent("");
    setpassword("");
    setpasswordConfirm("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Current Password">
        <Input
          type="text"
          value={passwordCurrent}
          onChange={(e) => setpasswordCurrent(e.target.value)}
          id="passwordCurrent"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="text"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          id="Password"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Confirm Password">
        <Input
          type="text"
          value={passwordConfirm}
          onChange={(e) => setpasswordConfirm(e.target.value)}
          id="passwordConfirm"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variations="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateDoctorPasswordForm;
