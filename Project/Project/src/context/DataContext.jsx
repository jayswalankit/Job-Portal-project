import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DataContext = createContext();

// Updated initialJobs with a recruiterEmail field for consistency
const initialJobs = [
  { id: "1", title: "React Developer", company: "TechCorp", location: "Bangalore", type: "Full-time", tags: ["React", "JavaScript", "Front-end"], description: "Build and maintain modern web applications...", requirements: "3+ years experience with React and Redux.", salary: "10-15 LPA", recruiterEmail: "recruiter1@jobhub.com" },
  { id: "2", title: "Python Backend Engineer", company: "DataFlow", location: "Remote", type: "Contract", tags: ["Python", "Django", "SQL"], description: "Design and implement scalable backend services.", requirements: "5+ years with Python and cloud services.", salary: "20 LPA", recruiterEmail: "recruiter1@jobhub.com" },
  // A job posted by a different recruiter
  { id: "3", title: "Cloud Architect", company: "CloudCo", location: "Seattle", type: "Full-time", tags: ["AWS", "Azure", "DevOps"], description: "Manage cloud infrastructure.", requirements: "7+ years in cloud architecture.", salary: "30-40 LPA", recruiterEmail: "recruiter2@jobhub.com" }
];

export function DataProvider({ children }) {
  const [jobs, setJobs] = useLocalStorage("jobhub_jobs", initialJobs);
  const [applications, setApplications] = useLocalStorage("jobhub_applications", []);
  const [searchFilters, setSearchFilters] = useLocalStorage("jobhub_filters", {
    address: "",
    type: "",
    role: ""
  });

  const addJob = (job) => {
    const newJob = { ...job, id: Date.now().toString() };
    setJobs(prev => [...prev, newJob]);
    return { ok: true, job: newJob };
  };

  const applyJob = (jobId, applicationData) => {
    const newApp = {
      id: Date.now().toString(),
      jobId,
      ...applicationData,
      status: "Submitted"
    };
    setApplications(prev => [...prev, newApp]);
    return { ok: true };
  };

  return (
    <DataContext.Provider value={{
      jobs,
      addJob,
      applyJob,
      applications,
      searchFilters,
      setSearchFilters
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);