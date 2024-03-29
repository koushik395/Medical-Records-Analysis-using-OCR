import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Login from "./pages/Login";
import WelcomePage from "./pages/WelcomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { AuthProvider } from "./context/auth";
import SignupForm from "./pages/Signup";
import PasswordForgot from "./pages/passwordForgot";
import PasswordReset from "./pages/PasswordReset";
import Upload from "./pages/Upload";
import Patient from "./pages/patient";
import Prescriptions from "./pages/Prescriptions";
import Stats from "./pages/Stats";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, //amount of time data store in cache
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="upload" element={<Upload />}></Route>
              <Route path="account" element={<Account />}></Route>
              <Route path="patient" element={<Patient />}></Route>
              <Route path="prescriptions" element={<Prescriptions />}></Route>
              <Route path="stats" element={<Stats />}></Route>
            </Route>
            <Route path="welcome" element={<WelcomePage />}></Route>
            <Route path="login">
              <Route path=":name" element={<Login />}></Route>
            </Route>
            <Route path="signup">
              <Route path=":name" element={<SignupForm />}></Route>
            </Route>
            <Route path="forgotPassword">
              <Route path=":name" element={<PasswordForgot />}></Route>
            </Route>
            <Route path="resetPassword">
              <Route path=":name/:token" element={<PasswordReset />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
