import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useToggle from "../hooks/useToggle";

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, toggleMenu] = useToggle(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully 👋");
    navigate("/");
  };

  return (
    <nav className="nav">
      <Link to="/" className="brand">JobHub</Link>

    
      <button
        className={`hamburger ${showMenu ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      
      <div className={`dropdown ${showMenu ? "show" : ""}`}>
        <Link to="/">Jobs</Link>
        {currentUser?.role === "recruiter" && <Link to="/add-job">Post Job</Link>}
        {currentUser && <Link to="/dashboard">Dashboard</Link>}
      </div>

      
      <div className="auth">
        {currentUser ? (
          
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn btn-primary">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
