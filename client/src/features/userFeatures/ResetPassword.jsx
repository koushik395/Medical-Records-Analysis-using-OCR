import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useResetPassword } from "./useResetPassword";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Email regex: /\S+@\S+\.\S+/

function ResetPassword() {
  const { resetPassword, isLoading } = useResetPassword();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { token } = useParams();
  const navigate = useNavigate();

  function onSubmit({ password, passwordConfirm }) {
    if (!password && !passwordConfirm) return;
    resetPassword(
      {
        password,
        passwordConfirm,
        token,
      },
      {
        onSettled: () => reset(),
      },
    );
  }

  function handleCancel() {
    reset();
    navigate(-1);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This Field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This Field is required",
            validate: (value) =>
              value === getValues().password || "Password doesnt match!!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variations="secondary"
          type="reset"
          disabled={isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Reset Password</Button>
      </FormRow>
    </Form>
  );
}

export default ResetPassword;
