import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
