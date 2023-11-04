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

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  actionText: string;
  handleAction: () => void;
  handleClose: () => void;
};

const Dialog = ({
  open,
  title,
  children,
  actionText,
  handleAction,
  handleClose,
}: Props) => {
  return (
    <MuiDialog open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus variant="contained" onClick={handleAction}>
          {actionText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
