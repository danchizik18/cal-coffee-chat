import React, { useState } from "react";
import { Form as AntdForm, Input, Button, message, Checkbox, InputNumber } from "antd";
import { db } from "../../config/firebase"; // Firebase Firestore
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Form.css';

const Form = () => {
  const [loading, setLoading] = useState(false);
  const personalInfoRef = collection(db, "personal-info");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
  
    const sanitizedValues = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      age: Number(values.age),
    };
  
    if (isNaN(sanitizedValues.age)) {
      message.error("Age must be a valid number.");
      setLoading(false);
      return;
    }
  
    try {
      // Example Firestore addDoc operation
      await addDoc(personalInfoRef, sanitizedValues);
      message.success("Form submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error); // Log the error details
      message.error("Error submitting form, please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AntdForm
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <AntdForm.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </AntdForm.Item>

      <AntdForm.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </AntdForm.Item>

      <AntdForm.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />

      </AntdForm.Item>

      <AntdForm.Item
        label="Age"
        name="age"
        rules={[{ required: true, message: "Please input your age!" }]}
      >
        <InputNumber />
      </AntdForm.Item>


      <AntdForm.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </AntdForm.Item>

      <AntdForm.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </AntdForm.Item>
    </AntdForm>
  );
};

export default Form;
