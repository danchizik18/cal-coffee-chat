import React, { useState } from "react";
import { Alert, Input, Button } from "antd";
import {
  GoogleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInWrapper,
  FormWrapper,
  Title,
  GoogleButton,
  StyledButton,
  StyledDivider,
} from "./styles"; 
import {
  auth,
  googleAuthProvider,
} from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google: ", user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
        setErrorMessage("Failed to sign in with Google. Please try again.");
      });
  };

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setErrorMessage("Failed to sign in. Please check your credentials.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePasswordReset = () => {
    setErrorMessage(null);
    setResetMessage(null);

    if (!email) {
      setErrorMessage("Please enter your email address first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetMessage("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to send reset email. Please try again.");
      });
  };

  return (
    <SignInWrapper>
      <FormWrapper>
        <Title>Sign In</Title>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        {resetMessage && (
          <Alert
            message={resetMessage}
            type="success"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        <GoogleButton
          icon={<GoogleOutlined />}
          size="large"
          onClick={signInWithGoogle}
        >
          Continue with Google
        </GoogleButton>

        <StyledDivider>OR</StyledDivider>

        <Input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginBottom: "16px" }}
        />

        <StyledButton
          type="primary"
          size="large"
          onClick={handleSignIn}
          loading={isLoading}
        >
          Log in
        </StyledButton>

        <div style={{ marginTop: "8px" }}>
          <Button type="link" onClick={handlePasswordReset}>
            Forgot your password?
          </Button>
        </div>

        <div style={{ marginTop: "16px" }}>
          Don’t have an account?
          <Link to="/signup">
            <Button type="link">Sign up</Button>
          </Link>
        </div>
      </FormWrapper>
    </SignInWrapper>
  );
};

export default SignIn;