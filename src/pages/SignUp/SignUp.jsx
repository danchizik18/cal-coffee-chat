// src/pages/SignUp/SignUp.jsx
import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./SignUp.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("Student");
    const [major, setMajor] = useState("");
    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [calendlyLink, setCalendlyLink] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setLoading(true);

        if (!email.endsWith("@berkeley.edu")) {
            message.error("Only @berkeley.edu email addresses are allowed.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "cal-connection", user.uid), {
                email,
                firstName,
                lastName,
                status: "Pending",
                role,
                major,
                company: role === "Alumni" ? company : "",
                jobTitle: role === "Alumni" ? jobTitle : "",
                gradYear,
                calendlyLink: role === "Alumni" ? calendlyLink : "",
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            });

            message.success("Account created successfully!");
            navigate("/form");
        } catch (error) {
            message.error("An error occurred during sign-up.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Join CalCoffeeChat</h1>
                <input type="email" placeholder="Berkeley Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field mb-3" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field mb-3" />
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field mb-3" />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field mb-3" />

                <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field mb-3">
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumni</option>
                </select>

                <input type="text" placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)} className="input-field mb-3" />
                <input type="number" placeholder="Graduation Year" value={gradYear} onChange={(e) => setGradYear(e.target.value)} className="input-field mb-3" />

                {role === "Alumni" && (
                    <>
                        <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="input-field mb-3" />
                        <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="input-field mb-3" />
                        <input type="text" placeholder="Calendly Link" value={calendlyLink} onChange={(e) => setCalendlyLink(e.target.value)} className="input-field mb-3" />
                    </>
                )}

                <button 
                    onClick={handleSignUp} 
                    disabled={loading} 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition">
                    {loading ? <Spin /> : "Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default SignUp;
