import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function JobDetail() {
  const { id } = useParams();
  const { jobs } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);

  if (!job) return <p className="error">Job not found</p>;

  return (
    <div className="card max-w-4xl mx-auto mt-10">
      <p className="muted text-sm mb-1">{job.company} is hiring!</p>
      <h2 className="text-3xl font-bold text-indigo-700 mb-1">{job.title}</h2>
      
      <p className="text-xl font-semibold text-gray-700 mb-4">
        {job.location} | <span className="font-semibold">{job.type}</span> | Salary: <span className="text-green-600 font-bold">₹{job.salary}</span>
      </p>

      <div className="mt-2 mb-6">
        {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="p-6 bg-gray-50 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">Job Description</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
      </div>
      
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold mb-2 text-indigo-600">Key Requirements</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
        {currentUser?.role === "seeker" ? (
          <button className="btn btn-primary" onClick={() => navigate(`/jobs/${job.id}/apply`)}>
            Apply Now
          </button>
        ) : (
          <p className="muted text-base">
            <Link to="/login" className="text-indigo-500 font-bold hover:underline">Login as a Job Seeker</Link> to apply.
          </p>
        )}
         <Link to="/" className="text-indigo-500 hover:text-indigo-700 font-semibold">← Back to all jobs</Link>
      </div>
    </div>
  );
}