// src/pages/Form/Form.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./Form.css";

const Form = () => {
    const [role, setRole] = useState("Student");
    const [major, setMajor] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [calendlyLink, setCalendlyLink] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "cal-connection", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setRole(userData.role || "Student");
                    setMajor(userData.major || "");
                    setGradYear(userData.gradYear || "");
                    setCompany(userData.company || "");
                    setJobTitle(userData.jobTitle || "");
                    setCalendlyLink(userData.calendlyLink || "");
                }
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "cal-connection", user.uid);
            await updateDoc(docRef, {
                role,
                major,
                gradYear,
                company: role === "Alumni" ? company : "",
                jobTitle: role === "Alumni" ? jobTitle : "",
                calendlyLink: role === "Alumni" ? calendlyLink : ""
            });

            message.success("Profile information saved!");
            navigate("/profile");
        }
        setLoading(false);
    };

    return (
        <div className="form-container bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Complete Your Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="font-bold">Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
                        <option value="Student">Student</option>
                        <option value="Alumni">Alumni</option>
                    </select>

                    <label className="font-bold">Major:</label>
                    <input 
                        type="text" 
                        placeholder="Major" 
                        value={major} 
                        onChange={(e) => setMajor(e.target.value)} 
                        className="input-field"
                    />

                    <label className="font-bold">Graduation Year:</label>
                    <input 
                        type="number" 
                        placeholder="Graduation Year" 
                        value={gradYear} 
                        onChange={(e) => setGradYear(e.target.value)} 
                        className="input-field"
                    />

                    {role === "Alumni" && (
                        <>
                            <label className="font-bold">Company:</label>
                            <input 
                                type="text" 
                                placeholder="Company" 
                                value={company} 
                                onChange={(e) => setCompany(e.target.value)} 
                                className="input-field"
                            />

                            <label className="font-bold">Job Title:</label>
                            <input 
                                type="text" 
                                placeholder="Job Title" 
                                value={jobTitle} 
                                onChange={(e) => setJobTitle(e.target.value)} 
                                className="input-field"
                            />

                            <label className="font-bold">Calendly Link:</label>
                            <input 
                                type="text" 
                                placeholder="Calendly Link" 
                                value={calendlyLink} 
                                onChange={(e) => setCalendlyLink(e.target.value)} 
                                className="input-field"
                            />
                        </>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition">
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
