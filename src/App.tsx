import { useState, useEffect } from "react";
import Axios from "axios";
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import PatientForm from "./components/PatientForm";
import { Typography } from "@mui/material";

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

  return (
    <div className="App" style={{ backgroundColor: "#eee" }}>
      <Header
        setShowDialog={setShowDialog}
        setSelectedPatient={setSelectedPatient}
      />
      {data ? (
        <>
          <Accordion
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
        </>
      ) : (
        <div
          style={{
            margin: "auto",
            padding: "100px",
          }}
        >
          <Typography>Loading....</Typography>
        </div>
      )}
    </div>
  );
}

export default App;
