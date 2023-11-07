import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

import { Dispatch, SetStateAction } from "react";
import { Patient } from "../../models/patient";
import useScreenSize from "../../hooks/useScreenSize";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

function Header({ setShowDialog, setSelectedPatient }: Props) {
  const { isScreenSizeSmall } = useScreenSize();
  const handleOpenDialog = () => setShowDialog(true);

  const buttonProps = {
    sx: {
      backgroundColor: "white",
      color: "black",
      ":hover": {
        backgroundColor: "#eee",
      },
    },
    onClick: () => {
      setSelectedPatient(undefined);
      handleOpenDialog();
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SpaceDashboardIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: isScreenSizeSmall ? "1rem" : "1.2rem" }}
          >
            Patient Manager
          </Typography>
          {isScreenSizeSmall ? (
            <IconButton {...buttonProps}>
              <PersonAddIcon />
            </IconButton>
          ) : (
            <Button variant="contained" endIcon={<PersonAddIcon />} {...buttonProps}>
              New Patient
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
