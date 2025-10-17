import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
 
  const [users, setUsers] = useLocalStorage("jobhub_users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("jobhub_current_user", null);

  const signup = (form) => {
    const { name, email, password, mobile } = form;

    if (!name || !email || !password || !mobile) {
      return { ok: false, error: "All fields are required" };
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return { ok: false, error: "Email already registered" };
    }

    const newUser = { name, email, password, mobile, role: null };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { ok: true, user: newUser };
  };


  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { ok: false, error: "Invalid credentials" };
    }
    setCurrentUser(user);
    return { ok: true, user };
  };

 
  const logout = () => setCurrentUser(null);

 
  const setRole = (role) => {
    setCurrentUser(prev => {
      const updated = { ...prev, role };
      setUsers(users.map(u => u.email === updated.email ? updated : u));
      return updated;
    });
  };

  
  const updateUser = (updates) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      setUsers(users.map(u => u.email === updated.email ? updated : u));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      signup,
      logout,
      setRole,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);