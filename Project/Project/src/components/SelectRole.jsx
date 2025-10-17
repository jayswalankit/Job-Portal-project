
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const { currentUser, setRole } = useAuth();
  const navigate = useNavigate();

  const choose = (role) => {
    setRole(role);
    navigate("/");
  };

  if (!currentUser) {
    return <p className="error">Please login first.</p>;
  }

  return (
    <div className="form-card max-w-md mx-auto mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
      <p className="muted mb-6 text-lg">Hi <strong className="text-indigo-600">{currentUser.name}</strong>, are you a...</p>
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary" onClick={() => choose("seeker")}>Job Seeker 🔎</button>
        <button className="btn btn-primary" onClick={() => choose("recruiter")}>Recruiter 💼</button>
      </div>
    </div>
  );
}