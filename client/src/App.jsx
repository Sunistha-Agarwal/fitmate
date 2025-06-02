import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { Toaster } from 'react-hot-toast';
import LogIn from "./pages/login";
import SignUp from "./pages/signup";

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
            path='/login'
            element={<LogIn />}
          />
          <Route 
            path="/signup"
            element={<SignUp/>}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
