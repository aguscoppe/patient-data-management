import { forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useScreenSize from "../../../hooks/useScreenSize";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const { isScreenSizeSmall } = useScreenSize();
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        ".MuiAlert-message": {
          fontSize: isScreenSizeSmall ? "12px" : "",
        },
        ".MuiAlert-action": {
          padding: isScreenSizeSmall ? "0" : "",
        },
        svg: {
          fontSize: isScreenSizeSmall ? "14px" : "",
        },
      }}
      {...props}
    />
  );
});

export default Alert;
