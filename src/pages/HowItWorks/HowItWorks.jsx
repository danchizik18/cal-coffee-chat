import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-container">
      <header className="how-header">
        <img src="/images/oski.png" alt="Oski" className="oski-icon" />
        <h1>How It Works</h1>
        <p>Our simple process connects students with alumni for valuable coffee chats.</p>
      </header>

      <div className="steps-container">
        <div className="step">
          <h2>1. Sign Up</h2>
          <p>Students and alumni fill out a sign-up form with their interests, availability, and preferences.</p>
        </div>

        <div className="step">
          <h2>2. Get Matched</h2>
          <p>Organizers match students to alumni based on shared interests and career goals.</p>
        </div>

        <div className="step">
          <h2>3. Meet Up</h2>
          <p>Chats can be virtual or in-person (at alumni/student's preference).</p>
        </div>

        <div className="step">
          <h2>4. Follow Up</h2>
          <p>Optional follow-up or continued connection if both parties want.</p>
        </div>
      </div>

      <div className="benefits-container">
        <div className="benefit">
          <h3>Benefits for Alumni</h3>
          <ul>
            <li>Opportunity to mentor and give back</li>
            <li>Recognition in monthly shoutout</li>
            <li>Possible Berkeley swag/gift cards in the future</li>
          </ul>
        </div>

        <div className="benefit">
          <h3>Benefits for Students</h3>
          <ul>
            <li>Learn from real-world experience</li>
            <li>Ask questions about careers and industries</li>
            <li>Make informed career decisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;