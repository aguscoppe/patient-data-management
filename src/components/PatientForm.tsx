import Dialog from "./Dialog";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Patient } from "../App";
import { v4 as uuidv4 } from "uuid";

type Props = {
  open: boolean;
  selectedPatient?: Patient;
  handleClose: () => void;
  handleSave: Dispatch<SetStateAction<Patient[] | undefined>>;
};

enum PatientFormField {
  Name = "name",
  Description = "description",
  Avatar = "avatar",
  Website = "website",
}

enum FieldError {
  Empty = "This field cannot be left empty",
  InvalidLink = "The provided link is not valid",
}

const initialPatientState = {
  name: "",
  description: "",
  website: "",
  avatar: "",
  createdAt: new Date().toISOString(),
  id: "",
};

const initialErrorState = {
  [PatientFormField.Name]: "",
  [PatientFormField.Description]: "",
  [PatientFormField.Avatar]: "",
  [PatientFormField.Website]: "",
};

const isValidLink = (str: string) => {
  const res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
};

const PatientForm = ({ open, selectedPatient, handleSave, handleClose }: Props) => {
  const [patient, setPatient] = useState<Patient>({
    ...initialPatientState,
    id: uuidv4(),
  });
  const [errors, setErrors] = useState(initialErrorState);
  const { name, description, avatar, website } = patient;

  useEffect(() => {
    setPatient({
      name: selectedPatient?.name ?? "",
      description: selectedPatient?.description ?? "",
      website: selectedPatient?.website ?? "",
      avatar: selectedPatient?.avatar ?? "",
      createdAt: selectedPatient?.createdAt ?? patient.createdAt,
      id: selectedPatient?.id ?? patient.id,
    });
  }, [selectedPatient]);

  const handleErrorCheck = async () => {
    const newErrorState = { ...initialErrorState };
    if (name === "") {
      newErrorState[PatientFormField.Name] = FieldError.Empty;
    }
    if (description === "") {
      newErrorState[PatientFormField.Description] = FieldError.Empty;
    }
    if (avatar === "") {
      newErrorState[PatientFormField.Avatar] = FieldError.Empty;
    } else if (!isValidLink(avatar)) {
      newErrorState[PatientFormField.Avatar] = FieldError.InvalidLink;
    }
    if (website === "") {
      newErrorState[PatientFormField.Website] = FieldError.Empty;
    } else if (!isValidLink(website)) {
      newErrorState[PatientFormField.Website] = FieldError.InvalidLink;
    }
    setErrors(newErrorState);
    return newErrorState;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetDialog = () => {
    setPatient({
      ...initialPatientState,
      id: uuidv4(),
    });
    setErrors(initialErrorState);
    handleClose();
  };

  const handleSubmit = async () => {
    const newErrorState = await handleErrorCheck();
    const errorAmount = Object.values(newErrorState).filter(
      (el) => el !== "",
    ).length;
    if (errorAmount === 0) {
      handleSave((prev: Patient[] | undefined) => {
        if (selectedPatient) {
          const filteredPrevState = prev?.filter(
            (el: Patient) => el.id !== selectedPatient.id,
          );
          return [{ ...patient }, ...(filteredPrevState as Patient[])];
        }
        return [{ ...patient }, ...(prev as Patient[])];
      });
      handleResetDialog();
    }
  };

  return (
    <Dialog
      open={open}
      handleClose={handleResetDialog}
      title={`${selectedPatient ? "Edit" : "Add"} Patient`}
      actionText="Done"
      handleAction={handleSubmit}
    >
      <TextField
        variant="filled"
        label="Name"
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        name={PatientFormField.Name}
        value={name}
        onChange={handleChange}
        helperText={errors[PatientFormField.Name]}
        error={errors[PatientFormField.Name] !== ""}
      />
      <TextField
        variant="filled"
        label="Description"
        fullWidth
        required
        multiline
        maxRows={4}
        sx={{ marginBottom: 2 }}
        name={PatientFormField.Description}
        value={description}
        onChange={handleChange}
        helperText={errors[PatientFormField.Description]}
        error={errors[PatientFormField.Description] !== ""}
      />
      <TextField
        variant="filled"
        label="Website"
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        name={PatientFormField.Website}
        value={website}
        onChange={handleChange}
        helperText={errors[PatientFormField.Website]}
        error={errors[PatientFormField.Website] !== ""}
      />
      <TextField
        label="Avatar"
        variant="filled"
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        name={PatientFormField.Avatar}
        value={avatar}
        onChange={handleChange}
        helperText={errors[PatientFormField.Avatar]}
        error={errors[PatientFormField.Avatar] !== ""}
      />
    </Dialog>
  );
};

export default PatientForm;
