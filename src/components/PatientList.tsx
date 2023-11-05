import PatientItem from "./PatientItem";
import { Patient } from "../App";
import { Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";

type Props = {
  data: Patient[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

function PatientList({ data, setShowDialog, setSelectedPatient }: Props) {
  return (
    <Grid item xs={11} sx={{ padding: "100px 0" }}>
      {data.map((item: Patient) => (
        <PatientItem
          data={item}
          key={item.id}
          setShowDialog={setShowDialog}
          setSelectedPatient={setSelectedPatient}
        />
      ))}
    </Grid>
  );
}

export default PatientList;
