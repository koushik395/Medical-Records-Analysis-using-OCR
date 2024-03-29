import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useForm } from "react-hook-form";
import Form from "../ui/Form";
import FileInput from "../ui/FileInput";
import { useUploadPrescription } from "../features/userFeatures/useUploadPrescription";
import Button from "../ui/Button";
import styled from "styled-components";
import { DNA } from "react-loader-spinner";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 25rem 25rem 10rem;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const StyledDiv = styled.div`
  text-align: center;
`;

const StyledPara = styled.p`
  color: var(--color-red-800);
`;

const Label = styled.label`
  font-weight: 500;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
}

function Upload() {
  const { register, handleSubmit, reset } = useForm();
  const { uploadPrescription, isUploading } = useUploadPrescription();

  function onSubmit({ prescription }) {
    if (!prescription[0]) return;

    const formData = new FormData();
    formData.append("prescription", prescription[0]);

    uploadPrescription(formData, {
      onSettled: () => reset(),
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Upload your prescriptions</Heading>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <FormRow label="Upload your file">
          <FileInput
            id="prescription"
            name="prescription"
            accept="image/*"
            disabled={isUploading}
            {...register("prescription")}
          />
          <Button variations="danger" disabled={isUploading}>
            Upload
          </Button>
        </FormRow>
        <StyledDiv>
          {isUploading && (
            <>
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <StyledPara>Your file is uploading....! Please wait</StyledPara>
            </>
          )}
        </StyledDiv>
      </Form>
    </>
  );
}

export default Upload;
