import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import WorkoutForm from "./components/WorkoutForm"
import { Toaster } from 'react-hot-toast';

function App() {
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="bg-off-white min-h-screen text-black-rich">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={ <Home /> }
          />
          <Route
            path="/addWorkout"
            element={<WorkoutForm/>}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
