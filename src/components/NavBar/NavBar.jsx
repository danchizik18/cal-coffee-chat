import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";


const NavBar = () => {
  const [user, setUser] = useState(null);


  // Set up auth state listener on mount and cleanup on unmount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);


  // Handle sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };


  return (
    <Menu mode="horizontal" theme="light">
      <Menu.Item key="signin">
        <Link to="/signin">Sign In</Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link to="/signup">Sign Up</Link>
      </Menu.Item>


      {/* Render Log Out button only if user is logged in */}
      {user && (
        <Menu.Item key="logout" onClick={handleLogout}>
          Log Out
        </Menu.Item>
      )}
    </Menu>
  );
};


export default NavBar;
