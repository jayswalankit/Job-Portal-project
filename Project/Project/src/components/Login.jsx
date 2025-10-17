import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = login(form.email, form.password);
    if (res.ok) {
      toast.success("Login successful!");
      navigate(res.user.role ? "/" : "/select-role");
    } else {
      toast.error(res.error || "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <button type="submit" className="btn btn-primary w-full py-3" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          New user? <Link to="/signup" className="auth-link">Create account</Link>
        </p>
      </div>
    </div>
  );
}