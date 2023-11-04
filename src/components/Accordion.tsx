import AccordionItem from "./AccordionItem";
import { Patient } from "../App";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: Patient[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedPatient: Dispatch<SetStateAction<Patient | undefined>>;
};

function Accordion({ data, setShowDialog, setSelectedPatient }: Props) {
  return (
    <div
      style={{
        margin: "auto",
        padding: "100px",
      }}
    >
      {data.map((item: Patient) => (
        <AccordionItem
          data={item}
          key={item.id}
          setShowDialog={setShowDialog}
          setSelectedPatient={setSelectedPatient}
        />
      ))}
    </div>
  );
}

export default Accordion;
