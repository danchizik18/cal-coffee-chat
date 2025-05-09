// Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Calendar, MessageSquare, Settings, User } from "lucide-react";
import "./Dashboard.css";

const mockMatches = [
  { id: 1, name: "Alex Johnson", type: "Alumni", graduationYear: "2015", major: "Computer Science", company: "Google", role: "Software Engineer" },
  { id: 2, name: "Jamie Smith", type: "Student", graduationYear: "2024", major: "Business Administration" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CalCoffeeChat Dashboard</h1>
        <nav className="nav">
          <Link to="#">Messages</Link>
          <Link to="#">Notifications</Link>
          <Link to="#">Profile</Link>
          <Link to="#">Settings</Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="tabs">
          <button className={activeTab === "upcoming" ? "active" : ""} onClick={() => setActiveTab("upcoming")}>Upcoming Chats</button>
          <button className={activeTab === "matches" ? "active" : ""} onClick={() => setActiveTab("matches")}>Potential Matches</button>
        </div>

        {activeTab === "upcoming" ? (
          <div className="upcoming-chats">
            <h2>No Upcoming Chats</h2>
            <p>Once you're matched with someone, your chats will appear here.</p>
          </div>
        ) : (
          <div className="potential-matches">
            <h2>Potential Matches</h2>
            {mockMatches.map((match) => (
              <div className="match-card" key={match.id}>
                <h3>{match.name}</h3>
                <p>{match.type} - Class of {match.graduationYear}</p>
                <p>Major: {match.major}</p>
                {match.company && <p>{match.role} at {match.company}</p>}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2023 CalCoffeeChat. All rights reserved.</p>
      </footer>
    </div>
  );
}
