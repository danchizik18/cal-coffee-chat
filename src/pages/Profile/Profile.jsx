import React, { useState, useEffect } from "react";
import { Card, Avatar, Button, Typography, Divider, message, Form, Input, InputNumber } from "antd";
import { EditOutlined, MailOutlined, UserOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { auth, db } from "../../config/firebase";
import { doc, query, where, getDocs, setDoc, collection } from "firebase/firestore";
import pfp from '../../images/pfp.png';
import "./Profile.css";

// Define the sanitizeData function
const sanitizeData = (values) => {
  const sanitizedValues = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    age: values.age ? parseInt(values.age, 10) : 0,
  };
  return sanitizedValues;
};

const { Title, Text } = Typography;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {


    const fetchUserData = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("Fetching data for UID:", currentUser.uid);

          // Correct usage of Firestore functions in Firebase v9+
          const userQuery = query(
            collection(db, "personal-info"), // Use collection() with db instance
            where("email", "==", currentUser.email) // Query to find matching email
          );

          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });
          } else {
            console.error("No user document found for this email:", currentUser.email);
            message.error("No profile data found");
          }
        } else {
          console.error("No authenticated user found");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        message.error("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };


    fetchUserData();
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      form.setFieldsValue(user);
    }
  };

  const saveProfile = async (values) => {
    try {
      const sanitizedValues = sanitizeData(values); // Use sanitizeData here
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(db, "personal-info", currentUser.uid);
        await setDoc(userDocRef, sanitizedValues, { merge: true });
        setUser(sanitizedValues);
        message.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      message.error("Failed to update profile. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="profile-container">
      <Card
        className="profile-card"
        style={{ width: 400 }}
        cover={
          <div className="profile-banner">
            <Avatar
              size={100}
              src={pfp}
              icon={<UserOutlined />}
              className="profile-avatar"
            />
          </div>
        }
        actions={[
          isEditing ? (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
              >
                Save
              </Button>
              <Button icon={<CloseOutlined />} onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={toggleEditMode}
            >
              Edit Profile
            </Button>
          ),
        ]}
      >
        <div className="profile-info">
          {isEditing ? (
            <Form
              form={form}
              layout="vertical"
              onFinish={saveProfile}
              initialValues={user}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Age is required" }]}
              >
                <InputNumber />
              </Form.Item>
            </Form>
          ) : (
            <>
              <Title level={4} className="profile-name">
                {user?.firstName} {user?.lastName}
              </Title>
              <Text type="secondary" className="profile-email">
                <MailOutlined /> {user?.email}
              </Text>
              <Divider />
              <Text className="profile-age">
                <strong>Age:</strong> {user?.age}
              </Text>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
