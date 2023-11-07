import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useScreenSize from "../../../hooks/useScreenSize";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  actionText: string;
  disableAction?: boolean;
  handleAction: () => void;
  handleClose: () => void;
};

const Dialog = ({
  open,
  title,
  children,
  actionText,
  disableAction = false,
  handleAction,
  handleClose,
}: Props) => {
  const { isScreenSizeSmall } = useScreenSize();
  return (
    <MuiDialog open={open}>
      <DialogTitle
        id="customized-dialog-title"
        sx={{ m: 0, p: 2, fontSize: isScreenSizeSmall ? "1rem" : "1.1rem" }}
      >
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon
          sx={{
            width: isScreenSizeSmall ? "14px" : "18px",
            height: isScreenSizeSmall ? "14px" : "18px",
          }}
        />
      </IconButton>
      <DialogContent dividers sx={{ padding: isScreenSizeSmall ? "12px" : "20px" }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          disabled={disableAction}
          onClick={handleAction}
          size={isScreenSizeSmall ? "small" : "medium"}
        >
          {actionText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
