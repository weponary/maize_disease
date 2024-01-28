import { ThemeProvider } from "@mui/material";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import { theme } from "./theme";
import Navbar from "./componenets/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import { useAuth } from "./context/useAuth";
import ChangePasswordPage from "./pages/auth/ChangePassword";
import VerifyUserPage from "./pages/auth/VerifyUser";
import DetectForm from "./pages/DetectPage";
import ResultPage from "./componenets/Result";
import HistoryPage from "./pages/History";

function App() {
  interface PrivateRoutesProps {
    isAuthenticated: boolean;
    authenticationPath: string;
  }

  interface PublicRoutesProps {
    isAuthenticated: boolean;
    authenticationPath: string;
  }

  const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
    isAuthenticated,
    authenticationPath,
  }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={authenticationPath} />;
  };

  const PublicRoutes: React.FC<PublicRoutesProps> = ({
    isAuthenticated,
    authenticationPath,
  }) => {
    return isAuthenticated ? <Navigate to={authenticationPath} /> : <Outlet />;
  };
  const { isAuthenticated, signOut } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      {/* Your application components and routes go here */}
      <Navbar signOut={signOut} isAuthenticated={isAuthenticated} />
      <Routes>
        {isAuthenticated ? (
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
        ) : (
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />
        )}
        <Route
          path="/auth/forgotPassword"
          element={
            <>
              <ForgetPasswordPage />
            </>
          }
        />
        <Route
          path="/auth/resetPassword/:token"
          element={
            <>
              <ResetPasswordPage />
            </>
          }
        />

        <Route
          element={
            <PublicRoutes
              isAuthenticated={isAuthenticated}
              authenticationPath="/"
            />
          }
        >
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/verifyUser/:token" element={<VerifyUserPage />} />
        </Route>
        <Route
          element={
            <PrivateRoutes
              isAuthenticated={isAuthenticated}
              authenticationPath="/auth/login"
            />
          }
        >
          <Route
            path="/changePassword"
            element={
              <>
                <ChangePasswordPage />
              </>
            }
          />
          <Route
            path="/detect"
            element={
              <>
                <DetectForm />
              </>
            }
          />
          <Route
            path="/history"
            element={
              <>
                <HistoryPage />
              </>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
