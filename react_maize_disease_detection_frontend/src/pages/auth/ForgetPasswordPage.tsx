import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { FORGET_PASSWORD } from "../../services/auth/mutation";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const forgetPasswordMutation = useMutation(FORGET_PASSWORD, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        toast.success(data?.data?.message || "Success");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });

  // const handleLogin = () => {
  //   // handle login logic here
  //   // navigate("/auth/login");

  // };

  const onSubmit = (data: any) => {
    console.log(data);
    // Submit logic here
    forgetPasswordMutation.mutate(data);
  };

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
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center", mb: 1 }}
              color="primary"
            >
              Forget Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <TextField
                label="Email"
                type="string"
                // required
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <Button variant="contained" type="submit" color="secondary">
                Send Email
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ForgetPasswordPage;
