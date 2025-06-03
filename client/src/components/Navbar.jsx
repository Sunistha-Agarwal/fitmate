import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogOut";

export default function Navbar() {
  const { user } = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="">
        <nav className="max-w-7xl mx-auto px-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="text-green font-bold text-2xl">
              <Link to="/">
                <h1>FitMate</h1>
              </Link>
            </div>
            {user ? (
              <div className="flex">
                <p>{user.email}</p>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            ) : (
              <div className="flex">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-2 ${isActive ? "text-green underline" : " "}`
                  }
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `px-2 ${isActive ? "text-green underline" : " "}`
                  }
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
