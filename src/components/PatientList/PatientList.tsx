import PatientItem from "../PatientItem/PatientItem";
import { Patient } from "../../models/patient";
import { Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../hooks/useScreenSize";

type Props = {
  data: Patient[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

function PatientList({ data, setShowDialog, setSelectedPatient }: Props) {
  const { isScreenSizeSmall } = useScreenSize();
  return (
    <Grid
      item
      xs={12}
      sm={11}
      sx={{ padding: isScreenSizeSmall ? "56px 0 0 0" : "100px 0" }}
    >
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
