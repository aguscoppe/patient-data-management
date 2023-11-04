import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AddIcon from "@mui/icons-material/Add";
import { Dispatch, SetStateAction } from "react";
import { Patient } from "../App";

type Props = {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

function Header({ setShowDialog, setSelectedPatient }: Props) {
  const handleOpenDialog = () => setShowDialog(true);
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patients Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedPatient(undefined);
              handleOpenDialog();
            }}
            sx={{
              backgroundColor: "white",
              color: "black",
              ":hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            New Patient
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
