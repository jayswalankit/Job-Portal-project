import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useAuthGuard(allowedRoles = []) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
      navigate("/login");
    }
  }, [currentUser, allowedRoles, navigate]);
}