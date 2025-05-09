import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";
import { Shield } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "cal-connection", user.uid), {
        Email: email,
        "First Name": firstName,
        "Last Name": lastName,
        Password: password,
        Status: "Pending"
      });

      message.success("Account created successfully!");
      navigate("/form");
    } catch (error) {
      message.error("An error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Join CalCoffeeChat</h1>
      <p className="signup-subtitle">Tell us who you are to get started.</p>

      <div className="verification-notice">
        <h3>Berkeley Verification Required</h3>
        <p>To ensure authenticity, all users must verify their Berkeley affiliation through CalNet.</p>
        <button className="calnet-button" onClick={() => navigate("/signin")}>Sign in with CalNet</button>
        <p className="note">Note: CalNet integration coming soon. Please use email registration for now.</p>
      </div>

      <div className="divider">OR CONTINUE WITH EMAIL</div>

      <input type="email" placeholder="Berkeley Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" />

      <button className="signup-button" onClick={handleSignUp} disabled={loading}>Sign Up</button>
    </div>
  );
};

export default SignUp;