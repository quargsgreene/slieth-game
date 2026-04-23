import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link" end>
                Home
            </NavLink>
            <NavLink to="/about" className="nav-link" end>
                About
            </NavLink>
            <NavLink to="/help" className="nav-link">
                Help
            </NavLink>
            <NavLink to="/status" className="nav-link">
                Status
            </NavLink>
            <NavLink to="/start" className="nav-link">
                Start
            </NavLink>
        </nav>
    );
}