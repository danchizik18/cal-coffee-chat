import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


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
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };


  return (
    <Menu mode="horizontal" theme="light">
      {/* Only show Sign In and Sign Up links if the user is not logged in */}
      {!user && (
        <>
          <Menu.Item key="signin">
            <Link to="/signin">Sign In</Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </>
      )}

      {/* Only show Log Out button if the user is logged in */}
      {user && (
        <>

          <Menu.Item key="logout" onClick={handleLogout}>
            Log Out
          </Menu.Item>
          <Menu.Item key="profile">
          <Link to="/profile">Profile</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};


export default NavBar;
