import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { useAuth } from "../../context/auth";
import FileInput from "../../ui/FileInput";

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();

  const { auth } = useAuth();

  const {
    name: Name,
    email: Email,
    contactNumber: ContactNumber,
    city: City,
    country: Country,
  } = auth.user;
  const [name, setName] = useState(Name);
  const [city, setCity] = useState(City);
  const [email, setEmail] = useState(Email);
  const [contactNumber, setcontactNumber] = useState(ContactNumber);
  const [country, setcountry] = useState(Country);
  const [photo, setPhoto] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name && !city && !email && !contactNumber && !country && !photo)
      return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("contactNumber", contactNumber);
    formData.append("photo", photo);

    console.log(...formData);
    updateUser(formData, {
      onSuccess: () => {
        e.target.reset();
      },
    });
  }

  function handleCancel() {
    setName(Name);
    setCity(city);
    setEmail(Email);
    setcontactNumber(ContactNumber);
    setcountry(Country);
    setPhoto(null);
  }

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <FormRow label="Name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Email">
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Contact Number">
        <Input
          type="text"
          value={contactNumber}
          onChange={(e) => setcontactNumber(e.target.value)}
          id="contactNumber"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="City">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Country">
        <Input
          type="text"
          value={country}
          onChange={(e) => setcountry(e.target.value)}
          id="country"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="photo"
          name="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
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

export default UpdateUserDataForm;
