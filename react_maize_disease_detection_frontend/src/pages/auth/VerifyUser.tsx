import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { VERIFY_USER } from "../../services/auth/query";
import logo from "../../assets/logo.png";

const VerifyUserPage = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("pending");

  useQuery(["verifyUser", token], () => VERIFY_USER(token), {
    enabled: !!token,
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        setVerificationStatus("verified");
        toast.success("User successfully verified");
      } else {
        setVerificationStatus("error");
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ width: "100%", boxShadow: 3, background: "#f5f5f5" }}>
          <CardContent>
            <img
              src={logo} // Replace with the path to your tick logo
              alt="Verified"
              style={{ width: "50px", height: "50px", margin: "auto" }}
            />
            {verificationStatus === "pending" && (
              <Typography
                variant="h4"
                component="h1"
                sx={{ textAlign: "center", mb: 1 }}
                color="primary"
              >
                Verifying User...
              </Typography>
            )}
            {verificationStatus === "verified" && (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ textAlign: "center", mt: 2, mb: 1 }}
                  color="primary"
                >
                  Verified
                </Typography>
              </>
            )}
            {verificationStatus === "error" && (
              <Typography
                variant="h4"
                component="h1"
                sx={{ textAlign: "center", mb: 1 }}
                color="error"
              >
                Something went wrong or user is already verified.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default VerifyUserPage;
