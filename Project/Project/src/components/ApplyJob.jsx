
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ApplyJob() {
  const { id } = useParams();
  const { jobs, applyJob } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);

  const [form, setForm] = useState({
    address: "",
    contact: "",
    gmail: currentUser?.email || "", 
    resume: null,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.resume) {
      toast.error("Please upload your resume in PDF format.");
      return;
    }
    if (!job) {
        toast.error("Job details are missing.");
        return;
    }

    const res = applyJob(job.id, {
      user: { name: currentUser.name, email: currentUser.email }, 
      address: form.address,
      contact: form.contact,
      gmail: form.gmail,
      resume: form.resume.name,
    });

    if (res.ok) {
      toast.success("Application submitted successfully!");
      navigate("/");
    }
  };

  if (!job) return <p className="error">Job not found</p>;

  return (
    <div className="apply-form form-card"> {/* Use form-card for consistent styling */}
      <h2 className="text-2xl font-bold mb-6">Apply for <span className="text-indigo-600">{job.title}</span></h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="address"
          placeholder="Your Full Address"
          value={form.address}
          onChange={onChange}
          required
        />
        <input
          className="input"
          name="contact"
          type="tel"
          placeholder="Contact Number (e.g., +91 9876543210)"
          value={form.contact}
          onChange={onChange}
          required
        />
        <input
          className="input"
          name="gmail"
          type="email"
          placeholder="Primary Email Address"
          value={form.gmail}
          onChange={onChange}
          required
        />
        <label className="muted block mb-1">Upload Resume (PDF only)</label>
        <input
          className="input"
          type="file"
          name="resume"
          accept=".pdf"
          onChange={onChange}
          required={!form.resume} // Require if no file is selected yet
        />
        <button className="btn btn-primary w-full mt-4">Submit Application</button>
      </form>
    </div>
  );
}