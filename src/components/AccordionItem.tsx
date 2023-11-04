import * as React from "react";
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
import { Patient } from "../App";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: Patient;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

const AccordionItem = ({ data, setShowDialog, setSelectedPatient }: Props) => {
  const { createdAt, description, name, website } = data;
  const [expanded, setExpanded] = React.useState<string | false>(false);

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
          <Avatar sx={{ marginRight: "20px" }} />
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">
              {new Date(createdAt).toDateString()}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
        <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => {
              setSelectedPatient(data);
              setShowDialog(true);
            }}
            sx={{ marginRight: "20px" }}
          >
            Edit
          </Button>
          <Button variant="contained" endIcon={<ArrowOutwardIcon />}>
            <a href={website} target="_blank">
              Website
            </a>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
