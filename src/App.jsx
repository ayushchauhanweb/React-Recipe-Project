import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import RecipeDetails from "./pages/RecipeDetails"


function App() {

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  )
}

export default App
