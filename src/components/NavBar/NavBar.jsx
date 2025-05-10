// src/components/NavBar/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import "./NavBar.css";

const NavBar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
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
            <div className="hidden md:flex gap-4">
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
                        <button 
                            onClick={handleLogout} 
                            className="hover:text-red-400 transition">
                            Log Out
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
                <div className="dropdown relative">
                    <button className="text-white focus:outline-none">
                        ☰
                    </button>
                    <div className="dropdown-menu absolute hidden bg-blue-700 text-white mt-2 rounded shadow-lg p-2 flex flex-col">
                        <Link to="/" className="py-1 hover:bg-blue-800 rounded">Home</Link>
                        <Link to="/about" className="py-1 hover:bg-blue-800 rounded">About</Link>
                        <Link to="/how-it-works" className="py-1 hover:bg-blue-800 rounded">How It Works</Link>
                        <Link to="/verification" className="py-1 hover:bg-blue-800 rounded">Verification</Link>
                        {!user ? (
                            <>
                                <Link to="/signin" className="py-1 hover:bg-blue-800 rounded">Sign In</Link>
                                <Link to="/signup" className="py-1 hover:bg-blue-800 rounded">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile" className="py-1 hover:bg-blue-800 rounded">Profile</Link>
                                <Link to="/match" className="py-1 hover:bg-blue-800 rounded">Match</Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="py-1 hover:bg-blue-800 rounded text-red-400">
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
