import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { applications, jobs } = useData();

  if (!currentUser) return <p className="error">Please login to view dashboard.</p>;

  // FIX: Filter jobs to show ONLY those posted by the current recruiter
  const recruiterJobs = currentUser.role === "recruiter"
    ? jobs.filter(job => job.recruiterEmail === currentUser.email)
    : [];

  // Seeker applications filter
  const seekerApplications = currentUser.role === "seeker"
    ? applications.filter(app => app.user.email === currentUser.email)
    : [];

  return (
    <div className="container">
      <h2 className="text-3xl font-bold mb-6">Welcome, {currentUser.name}!</h2>
      <p className="muted mb-6">Your current role: <strong className="text-indigo-600 capitalize">{currentUser.role}</strong></p>

      {currentUser.role === "seeker" && (
        <>
          <h3 className="text-2xl font-semibold mb-4">Your Job Applications ({seekerApplications.length})</h3>
          {seekerApplications.length === 0 && (
            <p className="muted">You haven't submitted any applications yet.</p>
          )}
          {seekerApplications.map(app => (
            <div key={app.id} className="card">
              <h4 className="text-xl font-bold text-indigo-600">Application for Job ID: {app.jobId}</h4>
              <p className="mt-2"><strong>Status:</strong> <span className="font-semibold text-green-600">{app.status}</span></p>
              <p><strong>Contact:</strong> {app.contact}</p>
              <p><strong>Email:</strong> {app.gmail}</p>
              <p><strong>Resume:</strong> {app.resume}</p>
              <p><strong>Address:</strong> {app.address}</p>
            </div>
          ))}
        </>
      )}

      {currentUser.role === "recruiter" && (
        <>
          {/* Display the filtered list of jobs */}
          <h3 className="text-2xl font-semibold mb-4">Your Posted Jobs ({recruiterJobs.length})</h3>
          {recruiterJobs.length === 0 && (
            <p className="muted">You haven't posted any jobs yet. Get started by clicking "Post Job"!</p>
          )}
          {recruiterJobs.map(job => (
            <div key={job.id} className="card">
              <h4 className="text-xl font-bold text-indigo-600">{job.title} at {job.company}</h4>
              <p className="muted mt-1 mb-2">{job.location} · {job.type} · ₹{job.salary}</p>
              <p>{job.description.substring(0, 100)}...</p>
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              <p className="mt-4 font-semibold text-sm">Applications Received: {applications.filter(app => app.jobId === job.id).length}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}