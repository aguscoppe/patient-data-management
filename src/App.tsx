import { useState, useEffect } from "react";
import Axios from "axios";
import PatientList from "./components/PatientList";
import Header from "./components/Header";
import PatientForm from "./components/PatientForm";
import { Grid } from "@mui/material";
import Loader from "./components/common/Loader/Loader";

export type Patient = {
  avatar: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  website: string;
};

function App() {
  const [data, setData] = useState<Patient[] | undefined>(undefined);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined,
  );
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios({
          url: "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users",
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setData]);

  const handleDialog = () => setShowDialog((prev) => !prev);

  if (!data) {
    return (
      <Grid
        container
        sx={{
          backgroundColor: "#eee",
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </Grid>
    );
  }

  return (
    <Grid
      container
      className="App"
      sx={{
        backgroundColor: "#eee",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header
        setShowDialog={setShowDialog}
        setSelectedPatient={setSelectedPatient}
      />
      <PatientList
        data={data}
        setShowDialog={setShowDialog}
        setSelectedPatient={setSelectedPatient}
      />
      <PatientForm
        open={showDialog}
        selectedPatient={selectedPatient}
        handleClose={() => {
          setSelectedPatient(undefined);
          handleDialog();
        }}
        handleSave={setData}
      />
    </Grid>
  );
}

export default App;
