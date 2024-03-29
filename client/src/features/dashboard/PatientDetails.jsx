import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import { useGetPatient } from "./useGetPatient";

// Email regex: /\S+@\S+\.\S+/

function PatientDetails() {
  const { getPatientApi, isLoading } = useGetPatient();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ name, email }) {
    getPatientApi(
      {
        name,
        email,
      },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <>
      <Heading as="h3">Get patient details</Heading>
      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <FormRow label="Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isLoading}
            {...register("name", { required: "This Field is required" })}
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
        <FormRow>
          <Button disabled={isLoading}>Get Patient Details</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default PatientDetails;
