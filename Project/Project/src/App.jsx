
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import NavBar from "./components/NavBar";
import JobDetail from "./components/JobDetail";
import ApplyJob from "./components/ApplyJob";
import AddJob from "./components/AddJob";
import Dashboard from "./components/Dashboard";
import RoleGate from "./components/RoleGate";
import Login from "./components/Login";
import Signup from "./components/Signup"; 
import SelectRole from "./components/SelectRole";
import JobSearch from "./components/JobSearch";
import JobList from "./components/JobList";
import { Toaster } from "react-hot-toast";
import "./global.css"; 

function MainApp() {
  return (
    <Router>
      <NavBar />
      <div className="main-content">
        <Routes>
          {/* Home route combines Search and List */}
          <Route path="/" element={<HomeLayout />} /> 
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          <Route path="/jobs/:id/apply" element={
            <RoleGate allow={["seeker"]}>
              <ApplyJob />
            </RoleGate>
          } />
          
          <Route path="/add-job" element={
            <RoleGate allow={["recruiter"]}>
              <AddJob />
            </RoleGate>
          } />
          
          <Route path="/dashboard" element={
            <RoleGate allow={["seeker", "recruiter"]}>
              <Dashboard />
            </RoleGate>
          } />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}


function HomeLayout() {
  return (
    <>
      <JobSearch />
      <JobList />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainApp />
      </DataProvider>
    </AuthProvider>
  );
}