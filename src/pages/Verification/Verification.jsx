// Verification.jsx
import React from "react";
import "./Verification.css";

const Verification = () => {
  return (
    <div className="verification-container">
      <header className="verification-header">
        <img src="/images/oski.png" alt="Oski" className="oski-icon" />
        <h1>Real People, Real Connections</h1>
        <p>CalCoffeeChat ensures authentic connections with verified Berkeley students and alumni.</p>
      </header>

      <div className="verification-methods">
        <div className="method">
          <h2>Berkeley Verified</h2>
          <p>Every user must sign in with their Berkeley credentials through CalNet authentication.</p>
          <div className="badge">100% Authentic: No fake profiles.</div>
        </div>

        <div className="method">
          <h2>Guaranteed Visibility</h2>
          <p>Our matching system ensures all student profiles are visible to alumni looking for mentees.</p>
          <div className="badge">Recently Fixed: Improved matching algorithm for better visibility.</div>
        </div>
      </div>
    </div>
  );
};

export default Verification;