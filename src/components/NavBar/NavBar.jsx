// src/components/NavBar/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./NavBar.css";

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const docRef = doc(db, "cal-connection", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfilePicUrl(docSnap.data().profilePicUrl || "");
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <nav className="bg-blue-700 text-white py-4 px-6 flex items-center justify-between shadow-md">
            <h1 className="text-2xl font-bold">
                <Link to="/">CalCoffeeChat</Link>
            </h1>
            <div className="hidden md:flex gap-4 items-center">
                <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
                <Link to="/how-it-works" className="hover:text-yellow-400 transition">How It Works</Link>
                <Link to="/verification" className="hover:text-yellow-400 transition">Verification</Link>
                {!user ? (
                    <>
                        <Link to="/signin" className="hover:text-yellow-400 transition">Sign In</Link>
                        <Link to="/signup" className="hover:text-yellow-400 transition">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link>
                        <Link to="/match" className="hover:text-yellow-400 transition">Match</Link>
                        {profilePicUrl ? (
                            <img src={profilePicUrl} alt="Profile" className="w-8 h-8 rounded-full" />
                        ) : (
                            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                        )}
                        <button 
                            onClick={handleLogout} 
                            className="hover:text-red-400 transition">
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;