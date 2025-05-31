import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { message } from "antd";
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "cal-connection", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    setPreviewUrl(docSnap.data().profilePicUrl || "");
                }
            }
        };
        fetchProfile();
    }, []);

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "cal-connection", user.uid);

            try {
                let downloadUrl = previewUrl; // Default to the existing URL

                if (profilePic) {
                    const storageRef = ref(storage, `profilePics/${user.uid}/${Date.now()}_${profilePic.name}`);
                    await uploadBytes(storageRef, profilePic);
                    downloadUrl = await getDownloadURL(storageRef);
                }

                // Directly update Firestore with the download URL
                await updateDoc(docRef, { profilePicUrl: downloadUrl });

                setUserData({ ...userData, profilePicUrl: downloadUrl });
                setPreviewUrl(downloadUrl);
                message.success("Profile updated successfully!");
            } catch (error) {
                console.error("Error saving profile:", error);
                message.error("Failed to save profile. Please try again.");
            }
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
                        <div className="profile-pic-container mt-4">
                            {previewUrl ? (
                                <img 
                                    src={previewUrl} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full object-cover" 
                                />
                            ) : (
                                <p>No profile picture selected</p>
                            )}
                        </div>
                        <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
                        <button 
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800" 
                            onClick={handleSaveChanges}
                        >
                            Save Profile
                        </button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;