enum PatientFormField {
  Name = "name",
  Description = "description",
  Avatar = "avatar",
  Website = "website",
}

enum FieldError {
  Empty = "Field cannot be left empty",
  InvalidLink = "Field contains invalid URL",
}

enum NotificationMessage {
  NewUserSuccess = "New patient has been created",
  EditedUserSuccess = "Patient data has been updated",
  NewUserError = "Patient creation has failed",
  EditedUserError = "Patient data update has failed",
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

export {
  PatientFormField,
  FieldError,
  NotificationMessage,
  initialPatientState,
  initialErrorState,
};
