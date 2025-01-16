import React, { useState } from "react";
import { auth } from "../../config/firebase"; // Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Input, Button, Space, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase"; 
import { collection, addDoc } from "firebase/firestore"; 

const { Title } = Typography;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Function to sign up with email and password
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );

      
      message.success("Account created successfully!");
      navigate("/form"); // Navigate to '/form' after successful sign-up
    } catch (error) {
      let errorMessage = "An error occurred during sign up.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message.error("This email is already registered. Please use a different email.");
          break;
        case "auth/invalid-email":
          message.error("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          message.error("Password should be at least 6 characters long.");
          break;
        default:
          message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Sign Up
      </Title>

      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="primary" 
          onClick={handleSignUp} // Call the correct function here
          block 
          loading={loading} // Show loading state on button while the request is processing
        >
          Sign Up
        </Button>
      </Space>
    </div>
  );
};

export default SignUp;
