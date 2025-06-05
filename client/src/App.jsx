import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import { useAuth } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuth()

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-off-white min-h-screen text-black-rich">
        <Navbar />
        <Routes>
          <Route path="/" element={user?(<Home />): <Navigate to='/login'/>} />
          <Route path="/login" element={!user? <LogIn/> : <Navigate to='/'/>} />
          <Route path="/signup" element={!user? <SignUp/> : <Navigate to='/'/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
