import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

// const FullPage = styled.div`
//   height: 100vh;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { auth } = useAuth();
  //2. If there is No auth user redirect to login page
  useEffect(
    function () {
      if (auth.token === "") navigate("/welcome");
    },
    [auth, navigate],
  );

  if (auth.token !== "") return children;
}

export default ProtectedRoute;
