import { useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext"; // <-- useAuth इम्पोर्ट किया गया
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// Note: motion is assumed to be imported from framer-motion if used in return
import { motion } from "framer-motion";

export default function AddJob() {
  const { addJob } = useData();
  const { currentUser } = useAuth(); // <-- वर्तमान यूज़र प्राप्त किया गया
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", company: "", location: "", type: "Full-time",
    tags: "", description: "", requirements: "", salary: ""
  });

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Safety check: Only allow recruiters to post
    if (!currentUser || currentUser.role !== "recruiter") {
      toast.error("You must be logged in as a Recruiter to post a job.");
      return;
    }

    const job = {
      ...form,
      // FIX: Save the recruiter's email
      recruiterEmail: currentUser.email,
      tags: form.tags.split(",").map(t => t.trim()).filter(t => t.length > 0)
    };

    const res = addJob(job);
    if (res.ok) {
      toast.success("Job posted successfully! 🎉");
      navigate("/"); // Navigate to the main job list (where ALL jobs show)
    }
  };

  return (
    <motion.div className="form-card max-w-lg mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <input className="input" name="title" placeholder="Job Title (e.g., Senior React Developer)" value={form.title} onChange={onChange} required />
        <input className="input" name="company" placeholder="Company Name" value={form.company} onChange={onChange} required />
        <input className="input" name="location" placeholder="Location (e.g., Remote, Bangalore)" value={form.location} onChange={onChange} required />
        <select className="input" name="type" value={form.type} onChange={onChange}>
          <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
        </select>
        <input className="input" name="tags" placeholder="Skills/Tags (comma separated: React, JS, Node)" value={form.tags} onChange={onChange} />
        <textarea className="input" name="description" placeholder="Job Description" value={form.description} onChange={onChange} required />
        <textarea className="input" name="requirements" placeholder="Key Requirements" value={form.requirements} onChange={onChange} required />
        <input className="input" name="salary" placeholder="Annual Salary (e.g., 8-12 LPA)" value={form.salary} onChange={onChange} required />
        <button className="btn btn-primary w-full mt-2">Publish Job</button>
      </form>
    </motion.div>
  );
}