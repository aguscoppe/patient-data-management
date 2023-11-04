import Dialog from "./Dialog";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Patient } from "../App";

type Props = {
  open: boolean;
  selectedPatient?: Patient;
  handleClose: () => void;
  handleSave: Dispatch<SetStateAction<Patient[] | undefined>>;
};

const PatientForm = ({ open, selectedPatient, handleSave, handleClose }: Props) => {
  const [patient, setPatient] = useState<Patient>({
    name: "",
    description: "",
    website: "",
    avatar: "",
    createdAt: new Date().toISOString(),
    id: "5",
  });
  const { name, description, avatar, website } = patient;

  useEffect(() => {
    setPatient({
      name: selectedPatient?.name ?? "",
      description: selectedPatient?.description ?? "",
      website: selectedPatient?.website ?? "",
      avatar: selectedPatient?.avatar ?? "",
      createdAt: selectedPatient?.createdAt ?? new Date().toISOString(),
      id: selectedPatient?.id ?? "5",
    });
  }, [selectedPatient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`${selectedPatient ? "Edit" : "Add"} Patient`}
      actionText="Done"
      handleAction={() => {
        handleSave((prev: Patient[] | any) => {
          if (selectedPatient) {
            const filteredPrevState = prev?.filter(
              (el: Patient) => el.id !== selectedPatient.id,
            );
            return [{ ...patient }, ...filteredPrevState];
          }
          return [{ ...patient }, ...prev];
        });
        handleClose();
      }}
    >
      <TextField
        variant="filled"
        label="Name"
        fullWidth
        sx={{ marginBottom: 2 }}
        name="name"
        value={name}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="Description"
        fullWidth
        multiline
        maxRows={4}
        sx={{ marginBottom: 2 }}
        name="description"
        value={description}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="Website"
        fullWidth
        sx={{ marginBottom: 2 }}
        name="website"
        value={website}
        onChange={handleChange}
      />
      <TextField
        label="Avatar"
        variant="filled"
        fullWidth
        sx={{ marginBottom: 2 }}
        name="avatar"
        value={avatar}
        onChange={handleChange}
      />
    </Dialog>
  );
};

export default PatientForm;
