import { Routes, Route } from "react-router-dom"
import Intro from "./pages/Intro"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </>
  )
}

export default App