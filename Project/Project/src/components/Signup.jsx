import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", mobile: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.email || !form.password || !form.mobile) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    const res = signup(form);
    if (res.ok) {
      toast.success("Account created successfully!");
      navigate("/select-role");
    } else {
      toast.error(res.error || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600">Join JobHub today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input" type="tel" name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
          <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <button type="submit" className="btn btn-primary w-full py-3" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}