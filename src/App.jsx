import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { Toaster } from "react-hot-toast"
function App() {
  const elements = useRoutes(routes)
  return (
    <>
      {elements}
      <Toaster position="botton-right" reverseOrder={false}></Toaster>
    </>
  )
}

export default App
