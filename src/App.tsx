import { useState, useEffect } from "react"
import Axios from "axios"
import Accordion from "./components/Accordion"

export type Patient = {
  avatar: string
  createdAt: string
  description: string
  id: string
  name: string
  website: string
}

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios({
          url: "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users",
        })
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [setData])

  console.log(data)

  return (
    <div className="App">
      <Accordion data={data} />
    </div>
  )
}

export default App
