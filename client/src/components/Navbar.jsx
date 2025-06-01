import { Link } from "react-router";

export default function Navbar() {
  return (
    <>
      <header className="">
        <nav className="max-w-7xl mx-auto px-4 pt-2">
            <div className="text-green font-bold text-2xl">
              <Link to="/">
                <h1>FitMate</h1>
              </Link>
            </div>
        </nav>
      </header>
    </>
  );
}
