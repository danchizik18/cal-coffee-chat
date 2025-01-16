import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"; // Import the updated CSS file

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

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
    <div className="navbar-container">
      <Menu mode="horizontal" theme="light" className="nav-menu">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>

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

        {user && (
          <>
            <Menu.Item key="logout" onClick={handleLogout}>
              Log Out
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="file">
              <Link to="/file">Files</Link>
            </Menu.Item>
          </>
        )}

        {/* Add "New" button as part of the Menu */}
        <Menu.Item key="new" className="new-button">
          <button className="new-btn" onClick = {goHome}>
            <i className="fa-solid fa-plus"></i>
            <span>New</span>
          </button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
