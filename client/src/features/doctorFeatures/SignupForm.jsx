import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";
import FileInput from "../../ui/FileInput";
import SelectGender from "../../ui/SelectGender";
import { useState } from "react";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const [gender, setGender] = useState("Male");

  function onSubmit({
    name,
    email,
    age,
    contactNumber,
    doctorId,
    country,
    password,
    passwordConfirm,
    photo,
  }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("doctorId", doctorId);
    formData.append("country", country);
    formData.append("contactNumber", contactNumber);
    formData.append("photo", photo[0]);
    signup(formData, {
      onSettled: () => reset(),
    });
  }

  function handleCancel() {
    reset();
    navigate(-1);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This Field is required" })}
        />
      </FormRow>

      <FormRow label="Doctor ID" error={errors?.doctorId?.message}>
        <Input
          type="text"
          id="doctorId"
          disabled={isLoading}
          {...register("doctorId", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This Field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Age" error={errors?.age?.message}>
        <Input
          type="Number"
          id="age"
          disabled={isLoading}
          {...register("age", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Gender">
        <SelectGender
          id="gender"
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ]}
          setGender={setGender}
          gender={gender}
        />
      </FormRow>

      <FormRow label="Contact Number" error={errors?.contactNumber?.message}>
        <Input
          type="text"
          id="contactNumber"
          disabled={isLoading}
          {...register("contactNumber", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Country" error={errors?.country?.message}>
        <Input
          type="text"
          id="country"
          disabled={isLoading}
          {...register("country", {
            required: "This Field is required",
          })}
        />
      </FormRow>

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
      <FormRow label="Avatar image">
        <FileInput
          id="photo"
          name="photo"
          accept="image/*"
          disabled={isLoading}
          {...register("photo")}
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
        <Button disabled={isLoading}>Register</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
