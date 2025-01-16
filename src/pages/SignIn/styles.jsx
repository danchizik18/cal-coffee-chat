import styled from "styled-components";
import { Button, Divider, Input, Typography } from "antd";

// Wrapper for the entire sign-in form
export const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

// Wrapper for the form inside the sign-in page
export const FormWrapper = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

// Title for the form
export const Title = styled(Typography.Title)`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
`;

// Styled Google button
export const GoogleButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;

// Styled button for sign-in
export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

// Divider between Google sign-in and email/password input
export const StyledDivider = styled(Divider)`
  margin: 20px 0;
`;

// Adjusting the input styling, no need to redefine
export const InputField = styled(Input)`
  margin-bottom: 16px;
`;

