import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      message.success("Signed in with Google successfully!");
      navigate("/dashboard");
    } catch (error) {
      message.error("Google Sign-In Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In to CalCoffeeChat</h1>


      <button className="google-signin-button" onClick={handleGoogleSignIn} disabled={loading}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
