import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <span className="separator">|</span>
      <Link to="/students" className="nav-link">Students</Link>
    </nav>
  );
}