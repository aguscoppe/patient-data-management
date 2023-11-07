import * as React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Patient } from "../../models/patient";
import { Dispatch, SetStateAction } from "react";
import useScreenSize from "../../hooks/useScreenSize";

type Props = {
  data: Patient;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

const PatientItem = ({ data, setShowDialog, setSelectedPatient }: Props) => {
  const { avatar, createdAt, description, name, website } = data;
  const [expanded, setExpanded] = useState<string | false>(false);
  const { isScreenSizeSmall } = useScreenSize();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Avatar src={avatar} sx={{ marginRight: "20px" }} />
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: isScreenSizeSmall ? "0.9rem" : "1.1rem" }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: isScreenSizeSmall ? "0.8rem" : "" }}
            >
              {new Date(createdAt).toDateString()}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant={isScreenSizeSmall ? "body2" : "body1"}
          sx={{
            fontSize: isScreenSizeSmall ? "0.8rem" : "",
            lineHeight: isScreenSizeSmall ? "18px" : "",
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: isScreenSizeSmall ? "center" : "flex-end",
          }}
        >
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => {
              setSelectedPatient(data);
              setShowDialog(true);
            }}
            size={isScreenSizeSmall ? "small" : "medium"}
            sx={{ marginRight: "20px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowOutwardIcon />}
            size={isScreenSizeSmall ? "small" : "medium"}
          >
            <a href={website} target="_blank">
              Website
            </a>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PatientItem;
