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

            const matchesMajor = selectedMajor ? alum.major.includes(selectedMajor) : true;
            const matchesCompany = selectedCompany ? alum.company.includes(selectedCompany) : true;
            const matchesJobTitle = selectedJobTitle ? alum.jobTitle.includes(selectedJobTitle) : true;

            return matchesSearch && matchesMajor && matchesCompany && matchesJobTitle;
        });
        setFilteredAlumni(filtered);
    }, [searchQuery, selectedMajor, selectedCompany, selectedJobTitle, alumni]);

    return (
        <div className="match-container bg-blue-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">Connect with Alumni</h1>

            <div className="filter-controls flex flex-wrap gap-4 mb-6">
                <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field" />
                <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)} className="input-field">
                    <option value="">All Majors</option>
                    {majors.map((major, index) => (<option key={index} value={major}>{major}</option>))}
                </select>
                <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="input-field">
                    <option value="">All Companies</option>
                    {companies.map((company, index) => (<option key={index} value={company}>{company}</option>))}
                </select>
                <select value={selectedJobTitle} onChange={(e) => setSelectedJobTitle(e.target.value)} className="input-field">
                    <option value="">All Job Titles</option>
                    {jobTitles.map((jobTitle, index) => (<option key={index} value={jobTitle}>{jobTitle}</option>))}
                </select>
            </div>

            <div className="alumni-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAlumni.length > 0 ? (
                    filteredAlumni.map((alum) => (
                        <div key={alum.id} className="alumni-card bg-white p-4 rounded shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-bold">{alum.firstName} {alum.lastName}</h3>
                            <p><strong>Major:</strong> {alum.major}</p>
                            <p><strong>Company:</strong> {alum.company || "N/A"}</p>
                            <p><strong>Job Title:</strong> {alum.jobTitle || "N/A"}</p>
                            {alum.calendlyLink && (
                                <a href={alum.calendlyLink} target="_blank" className="text-blue-600 hover:underline">Book a Meeting</a>
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