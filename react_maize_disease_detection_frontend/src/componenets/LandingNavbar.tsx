import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import GamesIcon from "@mui/icons-material/Games";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Pages = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const LandingNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <AppBar position="sticky">
      {/* <Toolbar>Navbar</Toolbar> */}
      <StyledToolBar>
        {/* <Logo /> */}
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          FunOlympic
        </Typography>
        <GamesIcon sx={{ display: { xs: "block", sm: "none" } }} />

        <Pages>
          <div
            style={{
              display: "flex",
              gap: 50,
              marginRight: 90,
            }}
          >
            <Typography
              variant="inherit"
              component={Link}
              to="/home"
              style={{
                textDecoration: isHovered ? "underline" : "none",
                color: location.pathname === "/home" ? "#C15319" : "white",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Home
            </Typography>
            <Typography
              variant="inherit"
              component={Link}
              to="/fixture"
              style={{
                textDecoration: isHovered ? "underline" : "none",
                color: location.pathname === "/fixture" ? "#C15319" : "white",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Fixture
            </Typography>
            <Typography
              variant="inherit"
              component={Link}
              to="/news"
              style={{
                textDecoration: isHovered ? "underline" : "none",
                color: location.pathname === "/news" ? "#C15319" : "white",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              News
            </Typography>
          </div>
          <div>
            <Button
              color="secondary"
              sx={{ font: 5 }}
              component={Link}
              to="/auth/login"
            >
              Login
            </Button>
            <Button color="secondary" component={Link} to="/auth/register">
              Register
            </Button>
          </div>
        </Pages>

        <UserBox>
          <Button color="secondary" component={Link} to="/auth/login">
            Login
          </Button>
          <Button color="secondary" component={Link} to="/auth/register">
            Register
          </Button>
        </UserBox>
      </StyledToolBar>
    </AppBar>
  );
};

export default LandingNavbar;
