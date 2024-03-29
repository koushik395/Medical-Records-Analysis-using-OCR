import { useAuth } from "../../context/auth";
import DashboardTable from "./DashboardTable";
import PatientDetails from "./PatientDetails";
import GetPrescriptions from "./GetPrescriptions";

function DashboardLayout() {
  const { auth } = useAuth();
  const role = auth.user.role;
  return (
    <>
      <DashboardTable user={auth.user} />
      {role === "doctor" && <PatientDetails />}
      {role === "patient" && <GetPrescriptions />}
    </>
  );
}

export default DashboardLayout;
