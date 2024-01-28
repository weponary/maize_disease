import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import { useAuth } from "../context/useAuth";

interface Props {
  signOut: () => void;
}

const Profile = ({ signOut }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // const { user } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
    navigate("/auth/login");
  };

  const handleChangePassword = () => {
    handleMenuClose();
    navigate("/changePassword");
  };

  return (
    <>
      <div>
        <Button
          color="inherit"
          onClick={handleMenuOpen}
          startIcon={<AccountCircle style={{ fontSize: 25 }} />}
        ></Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleSignOut}>{"Logout"}</MenuItem>
          <MenuItem onClick={handleChangePassword}>
            {"Change Password"}
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Profile;
