// src/pages/Match/Match.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Match.css";

const Match = () => {
    const [alumni, setAlumni] = useState([]);
    const [filteredAlumni, setFilteredAlumni] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [majors, setMajors] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedJobTitle, setSelectedJobTitle] = useState("");

    useEffect(() => {
        const fetchAlumni = async () => {
            const alumniRef = collection(db, "cal-connection");
            const q = query(alumniRef, where("role", "==", "Alumni"));
            const snapshot = await getDocs(q);
            const alumniList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setAlumni(alumniList);
            setFilteredAlumni(alumniList);

            // Get unique values for dropdowns
            setMajors([...new Set(alumniList.map((alum) => alum.major).filter(Boolean))]);
            setCompanies([...new Set(alumniList.map((alum) => alum.company).filter(Boolean))]);
            setJobTitles([...new Set(alumniList.map((alum) => alum.jobTitle).filter(Boolean))]);
        };

        fetchAlumni();
    }, []);

    useEffect(() => {
        const filtered = alumni.filter((alum) => {
            const matchesSearch = alum.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  alum.lastName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesMajor = selectedMajor ? 
                alum.major.toLowerCase().includes(selectedMajor.toLowerCase()) : true;
            const matchesCompany = selectedCompany ? 
                alum.company.toLowerCase().includes(selectedCompany.toLowerCase()) : true;
            const matchesJobTitle = selectedJobTitle ? 
                alum.jobTitle.toLowerCase().includes(selectedJobTitle.toLowerCase()) : true;

            return matchesSearch && matchesMajor && matchesCompany && matchesJobTitle;
        });
        setFilteredAlumni(filtered);
    }, [searchQuery, selectedMajor, selectedCompany, selectedJobTitle, alumni]);

    return (
        <div className="match-container bg-blue-100 min-h-screen flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Connect with Alumni</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-4 w-full max-w-3xl">
                <input 
                    type="text" 
                    placeholder="Search by name..." 
                    className="input-field"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Type or select Major" 
                    className="input-field"
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    list="majors"
                />
                <datalist id="majors">
                    {majors.map((major, index) => (
                        <option key={index} value={major} />
                    ))}
                </datalist>

                <input 
                    type="text" 
                    placeholder="Type or select Company" 
                    className="input-field"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    list="companies"
                />
                <datalist id="companies">
                    {companies.map((company, index) => (
                        <option key={index} value={company} />
                    ))}
                </datalist>

                <input 
                    type="text" 
                    placeholder="Type or select Job Title" 
                    className="input-field"
                    value={selectedJobTitle}
                    onChange={(e) => setSelectedJobTitle(e.target.value)}
                    list="jobTitles"
                />
                <datalist id="jobTitles">
                    {jobTitles.map((jobTitle, index) => (
                        <option key={index} value={jobTitle} />
                    ))}
                </datalist>
            </div>

            <div className="alumni-list w-full max-w-3xl">
                {filteredAlumni.length > 0 ? (
                    filteredAlumni.map((alum) => (
                        <div key={alum.id} className="alumni-card bg-white p-4 rounded shadow mb-3">
                            <h3 className="text-lg font-bold">{alum.firstName} {alum.lastName}</h3>
                            <p><strong>Major:</strong> {alum.major}</p>
                            <p><strong>Company:</strong> {alum.company || "N/A"}</p>
                            <p><strong>Job Title:</strong> {alum.jobTitle || "N/A"}</p>
                            {alum.calendlyLink && (
                                <a href={alum.calendlyLink} target="_blank" className="text-blue-600 hover:underline">
                                    Book a Meeting
                                </a>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No Alumni Found</p>
                )}
            </div>
        </div>
    );
};

export default Match;
