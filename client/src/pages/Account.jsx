import UpdateUserPasswordForm from "../features/userFeatures/UpdateUserPasswordForm";
import UpdateUserDataForm from "../features/userFeatures/UpdateUserDataForm";
import UpdateDoctorDataForm from "../features/doctorFeatures/UpdateDoctorDataForm";
import UpdateDoctorPasswordForm from "../features/doctorFeatures/UpdateDoctorPasswordForm";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

import { useAuth } from "../context/auth";

function Account() {
  const { auth } = useAuth();
  const role = auth.user.role;
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update {role} data</Heading>
        {role === "patient" ? <UpdateUserDataForm /> : <UpdateDoctorDataForm />}
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        {role === "patient" ? (
          <UpdateUserPasswordForm />
        ) : (
          <UpdateDoctorPasswordForm />
        )}
      </Row>
    </>
  );
}

export default Account;
