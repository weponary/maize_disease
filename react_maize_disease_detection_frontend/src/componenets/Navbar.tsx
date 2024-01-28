import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import GamesIcon from "@mui/icons-material/Games";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";

import logo from "../assets/logo.png";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const MobileMenu = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "16px",
});

interface NavbarProps {
  isAuthenticated: boolean;
  signOut: () => void;
}

// ... (existing imports)

const Navbar = ({ isAuthenticated, signOut }: NavbarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const onClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolBar style={{ gap: "30px" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { sm: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              alignItems: { xs: "none", sm: "center" },
              gap: "10px",
            }}
            width={isMobile ? "80%" : "auto"}
          >
            <img
              src={logo} // Replace with the path to your logo
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                margin: "auto",
                padding: "10px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Maize Leaf Disease Detection System
            </Typography>
          </Box>

          {isMobile ? (
            // <GamesIcon sx={{ display: { xs: "block", sm: "none" } }} />
            <></>
          ) : (
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                width: "100%",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <div onClick={() => onClick("/")}>
                  <Typography
                    variant="inherit"
                    component={Link}
                    to="/"
                    style={{
                      textDecoration: isHovered ? "underline" : "none",
                      color: location.pathname === "/" ? "#C15319" : "inherit",
                    }}
                  >
                    Home
                  </Typography>
                </div>
                {isAuthenticated && (
                  <div onClick={() => onClick("/detect")}>
                    <Typography
                      variant="inherit"
                      component={Link}
                      to="/detect"
                      style={{
                        textDecoration: isHovered ? "underline" : "none",
                        color:
                          location.pathname === "/detect"
                            ? "#C15319"
                            : "inherit",
                      }}
                    >
                      Detect
                    </Typography>
                  </div>
                )}
                {isAuthenticated && (
                  <div onClick={() => onClick("/history")}>
                    <Typography
                      variant="inherit"
                      component={Link}
                      to="/history"
                      style={{
                        textDecoration: isHovered ? "underline" : "none",
                        color:
                          location.pathname === "/history"
                            ? "#C15319"
                            : "inherit",
                      }}
                    >
                      History
                    </Typography>
                  </div>
                )}
              </div>
            </Box>
          )}
          {isAuthenticated ? (
            <Profile signOut={signOut} />
          ) : (
            <div style={{ display: "flex" }}>
              <Button color="secondary" component={Link} to="/auth/login">
                Login
              </Button>
              <Button color="secondary" component={Link} to="/auth/register">
                Register
              </Button>
            </div>
          )}
        </StyledToolBar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <MobileMenu>
            <img
              src={logo} // Replace with the path to your logo
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                margin: "auto",
                padding: "10px",
              }}
            />
            <List>
              <ListItem
                button
                onClick={() => onClick("/")}
                selected={location.pathname === "/"}
              >
                <Typography variant="inherit">Home</Typography>
              </ListItem>
              {isAuthenticated && (
                <ListItem
                  button
                  onClick={() => onClick("/detect")}
                  selected={location.pathname === "/detect"}
                >
                  <Typography variant="inherit">Detect</Typography>
                </ListItem>
              )}
              {isAuthenticated && (
                <ListItem
                  button
                  onClick={() => onClick("/history")}
                  selected={location.pathname === "/history"}
                >
                  <Typography variant="inherit">History</Typography>
                </ListItem>
              )}
            </List>
          </MobileMenu>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
