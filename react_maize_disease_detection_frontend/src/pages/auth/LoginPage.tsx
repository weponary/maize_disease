import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/useAuth";
import { setLocalSession } from "../../utils/storage.utils";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { LOGIN } from "../../services/auth/mutation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setIsAuthenticated, setAuthToken, setUser } = useAuth();

  const loginMutation = useMutation(LOGIN, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        setAuthToken(data?.data?.result?.accessToken);
        setUser(data?.data?.result);
        setLocalSession("@fun-token", data?.data?.result?.accessToken);
        setLocalSession("@fun-email", data?.data?.result?.email);
        setLocalSession("@fun-userId", data?.data?.result?.id.toString());
        setLocalSession("@fun-firstName", data?.data?.result?.firstName);
        setIsAuthenticated(true);
        toast.success(data?.data?.message || "Success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });

  const handleClick = () => {
    navigate("/auth/register");
  };

  const handleLogin = (data: any) => {
    loginMutation.mutate(data);
  };

  const handelForgetPassword = () => {
    navigate("/auth/forgotPassword");
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
              color={"primary"}
            >
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleLogin)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <TextField
                label="Email"
                type="email"
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
              <TextField
                label="Password"
                type="password"
                // required
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end"></IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" type="submit" color="secondary">
                Login
              </Button>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 1, mb: 1, ml: 30 }}
            >
              <Link
                onClick={handelForgetPassword}
                sx={{ bgcolor: "primary", cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mr: 15, mt: 5 }}>
              <Link
                onClick={handleClick}
                underline="none"
                sx={{
                  marginTop: "0.5rem",
                  bgcolor: "primary",
                  cursor: "pointer",
                }}
              >
                Don't have an account? Register Now
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
