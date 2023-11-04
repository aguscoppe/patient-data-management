import * as React from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import EditIcon from "@mui/icons-material/Edit"
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import PersonIcon from "@mui/icons-material/Person"
import { Patient } from "../App"

type Props = {
  data: Patient
}

const AccordionItem = ({ data }: Props) => {
  const { avatar, createdAt, description, name, website } = data
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }
  return (
    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">{createdAt}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
        <Box>
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            sx={{ marginRight: "20px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<PersonIcon />}
            sx={{ marginRight: "20px" }}
          >
            <a href={avatar} target="_blank">
              avatar
            </a>
          </Button>
          <Button variant="contained" endIcon={<ArrowOutwardIcon />}>
            <a href={website} target="_blank">
              Website
            </a>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem
