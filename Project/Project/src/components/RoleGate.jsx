import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function RoleGate({ allow, children }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!currentUser || !allow.includes(currentUser.role)) {
      setShowRedirect(true);
      toast.error("Please login as authorized user to access this page");
    }
  }, [currentUser]);

  if (showRedirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}