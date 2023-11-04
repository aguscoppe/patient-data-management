import AccordionItem from "./AccordionItem"
import { Patient } from "../App"

type Props = {
  data: Patient[]
}

function Accordion({ data }: Props) {
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      {data.map((item: Patient) => (
        <AccordionItem data={item} key={item.id} />
      ))}
    </div>
  )
}

export default Accordion
