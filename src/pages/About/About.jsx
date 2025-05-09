// About.jsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About CalCoffeeChat</h1>
      <p>Connecting Cal students and alumni through meaningful conversations.</p>

      <div className="purpose-vision">
        <div className="purpose">
          <h2>Our Purpose</h2>
          <ul>
            <li>✔️ Help students explore career paths, ask questions, and gain advice</li>
            <li>✔️ Allow alumni to give back and stay engaged with Cal</li>
            <li>✔️ Strengthen the Berkeley community across generations</li>
            <li>✔️ Foster a culture of networking, growth, and mentorship</li>
          </ul>
        </div>

        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            We believe that the Berkeley community is stronger when connected across generations. CalCoffeeChat creates
            a platform for students to learn from alumni experiences while giving alumni an opportunity to give back to
            the Cal community.
          </p>
          <p>
            Through these connections, we aim to build a more robust network of Bears supporting Bears, creating lasting
            relationships that benefit both students and alumni.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;