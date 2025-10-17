import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function JobList() {
  const { jobs, searchFilters } = useData();

  const filteredJobs = jobs.filter(job => {
    // Check for location match (address)
    const matchAddress = searchFilters.address === "" || job.location.toLowerCase().includes(searchFilters.address.toLowerCase());

    // Check for job type match (Full-time, Contract, etc.)
    const matchType = searchFilters.type === "" || job.type === searchFilters.type;

    // Check for role match (in title or tags)
    const matchRole = searchFilters.role === "" ||
      job.title.toLowerCase().includes(searchFilters.role.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchFilters.role.toLowerCase()));

    return matchAddress && matchType && matchRole;
  });

  return (
    <div className="container">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {searchFilters.address || searchFilters.type || searchFilters.role
          ? `Showing ${filteredJobs.length} Job${filteredJobs.length !== 1 ? 's' : ''}`
          : "Latest Job Openings"}
      </h2>

      {filteredJobs.length === 0 && (
        <p className="muted text-center text-xl card">No jobs match your current search criteria. Try a broader search!</p>
      )}

      <div className="grid sm-grid-cols-2 lg-grid-cols-3">
        {filteredJobs.map((j, index) => (
          <motion.div
            key={j.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <h3 className="text-xl font-bold text-indigo-700">{j.title}</h3>
            <p className="text-lg font-semibold text-gray-800">{j.company}</p>
            <p className="muted text-sm border-b pb-2 mb-2">
              {j.location} • <span className="font-semibold">{j.type}</span>
            </p>
            <p className="text-gray-700 mt-2">{j.description.substring(0, 90)}...</p>

            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {j.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
              {j.tags.length > 3 && <span className="tag muted">+{j.tags.length - 3}</span>}
            </div>

            <p className="text-xl font-bold text-green-600 mb-4">₹{j.salary}</p>

            <Link to={`/jobs/${j.id}`} className="btn btn-primary block">View Details</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}