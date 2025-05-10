// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Modal, Input, Button, message } from "antd";
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "cal-connection", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            }
        };
        fetchProfile();
    }, []);

    const openEditModal = () => {
        setUpdatedData({ ...userData });
        setEditModalOpen(true);
    };

    const handleSaveChanges = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "cal-connection", user.uid);
            await updateDoc(docRef, updatedData);
            setUserData(updatedData);
            setEditModalOpen(false);
            message.success("Profile updated successfully!");
        }
    };

    return (
        <div className="profile-container bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Your Profile</h1>
                {userData ? (
                    <div className="profile-info">
                        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Role:</strong> {userData.role}</p>
                        <p><strong>Major:</strong> {userData.major}</p>
                        <p><strong>Company:</strong> {userData.company}</p>
                        <p><strong>Job Title:</strong> {userData.jobTitle}</p>
                        <p><strong>Graduation Year:</strong> {userData.gradYear}</p>
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={openEditModal}>Edit Profile</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

                <Modal 
                    title="Edit Profile" 
                    visible={editModalOpen} 
                    onOk={handleSaveChanges} 
                    onCancel={() => setEditModalOpen(false)}
                >
                    <Input placeholder="Company" value={updatedData.company || ""} onChange={(e) => setUpdatedData({ ...updatedData, company: e.target.value })} />
                    <Input placeholder="Job Title" value={updatedData.jobTitle || ""} onChange={(e) => setUpdatedData({ ...updatedData, jobTitle: e.target.value })} />
                    <Input placeholder="Calendly Link" value={updatedData.calendlyLink || ""} onChange={(e) => setUpdatedData({ ...updatedData, calendlyLink: e.target.value })} />
                </Modal>
            </div>
        </div>
    );
};

export default Profile;
