import { useState, useEffect } from "react"; // <-- Import useEffect
import { useData } from "../context/DataContext";
import { motion } from "framer-motion";

export default function JobSearch() {
  const { searchFilters, setSearchFilters } = useData();
  const [form, setForm] = useState(searchFilters); // Initialize form with current filters

  // NEW FIX: Reset filters to clear any previous search terms when the component mounts
  // This ensures the main page shows ALL jobs initially.
  useEffect(() => {
    // Check if any filter is non-empty
    const shouldReset = form.address !== "" || form.type !== "" || form.role !== "";

    if (shouldReset) {
      const emptyFilters = { address: "", type: "", role: "" };
      setForm(emptyFilters);
      setSearchFilters(emptyFilters);
    }
  }, []); // Run only once when the component mounts

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the global context with the form data (this triggers JobList to re-filter)
    setSearchFilters(form);
  };

  // The rest of your return structure remains the same
  return (
    <motion.div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-xl rounded-lg"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
        {/* Role Search */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Job Role / Keyword</label>
          <input
            className="input"
            type="text"
            id="role"
            name="role"
            placeholder="e.g., React, Python, Manager"
            value={form.role}
            onChange={onChange}
          />
        </div>

        {/* Location Search */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            className="input"
            type="text"
            id="address"
            name="address"
            placeholder="e.g., Remote, Bangalore"
            value={form.address}
            onChange={onChange}
          />
        </div>

        {/* Type Dropdown */}
        <div className="min-w-[150px]">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
          <select className="input" id="type" name="type" value={form.type} onChange={onChange}>
            <option value="">Any Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        {/* Search Button */}
        <button type="submit" className="btn btn-primary h-[40px] mt-4 sm:mt-0">Search Jobs</button>
      </form>
    </motion.div>
  );
}