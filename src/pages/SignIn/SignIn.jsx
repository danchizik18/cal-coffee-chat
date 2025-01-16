import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setAlert({ message: "Google Sign-In Successful!", type: "success" });
      navigate('/profile');
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    } finally {
      setLoading(false);

    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlert({ message: "Sign-In Successful!", type: "success" });
      navigate('/profile');
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Sign In</h1>
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <form className="signin-form" onSubmit={handleEmailSignIn}>
          <input
            type="email"
            className="signin-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="signin-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="signin-button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          className="google-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
