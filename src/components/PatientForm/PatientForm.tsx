import Dialog from "../common/Dialog/Dialog";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  initialPatientState,
  initialErrorState,
  PatientFormField,
  FieldError,
  NotificationMessage,
} from "./PatientForm.constants";
import { isValidLink } from "./PatientForm.utils";
import { Patient } from "../../models/patient";
import { Notification } from "../../models/notification";
import useScreenSize from "../../hooks/useScreenSize";

type Props = {
  open: boolean;
  selectedPatient?: Patient;
  handleClose: () => void;
  handleSave: Dispatch<SetStateAction<Patient[] | undefined>>;
  handleNotification: Dispatch<SetStateAction<Notification>>;
};

const PatientForm = ({
  open,
  selectedPatient,
  handleSave,
  handleClose,
  handleNotification,
}: Props) => {
  const { isScreenSizeSmall } = useScreenSize();
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
      handleNotification({
        show: true,
        severity: "success",
        message: selectedPatient
          ? NotificationMessage.EditedUserSuccess
          : NotificationMessage.NewUserSuccess,
      });
      handleResetDialog();
    } else {
      handleNotification({
        show: true,
        severity: "error",
        message: selectedPatient
          ? NotificationMessage.EditedUserError
          : NotificationMessage.NewUserError,
      });
    }
  };

  const textFieldProps = {
    fullWidth: true,
    required: true,
    sx: {
      marginBottom: 2,
      "& .MuiFormLabel-root": {
        fontSize: "0.85rem",
      },
      "& .MuiInputBase-root": {
        fontSize: "0.85rem",
      },
    },
    onChange: handleChange,
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
        {...textFieldProps}
        variant="filled"
        label="Name"
        name={PatientFormField.Name}
        value={name}
        helperText={errors[PatientFormField.Name]}
        error={errors[PatientFormField.Name] !== ""}
        size={isScreenSizeSmall ? "small" : "medium"}
      />
      <TextField
        {...textFieldProps}
        variant="filled"
        label="Description"
        multiline
        maxRows={4}
        name={PatientFormField.Description}
        value={description}
        helperText={errors[PatientFormField.Description]}
        error={errors[PatientFormField.Description] !== ""}
        size={isScreenSizeSmall ? "small" : "medium"}
      />
      <TextField
        {...textFieldProps}
        variant="filled"
        label="Website"
        name={PatientFormField.Website}
        value={website}
        helperText={errors[PatientFormField.Website]}
        error={errors[PatientFormField.Website] !== ""}
        size={isScreenSizeSmall ? "small" : "medium"}
      />
      <TextField
        {...textFieldProps}
        label="Avatar"
        variant="filled"
        name={PatientFormField.Avatar}
        value={avatar}
        helperText={errors[PatientFormField.Avatar]}
        error={errors[PatientFormField.Avatar] !== ""}
        size={isScreenSizeSmall ? "small" : "medium"}
        sx={{ ...textFieldProps.sx, marginBottom: 0 }}
      />
    </Dialog>
  );
};

export default PatientForm;
