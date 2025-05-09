import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Connect with the Berkeley Community</h1>
        <p className="home-subtitle">CalCoffeeChat connects current Cal students with alumni for meaningful coffee chats, mentorship, and career guidance.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button">Get Started</Link>
          <Link to="/about" className="cta-outline">Learn More</Link>
        </div>
      </header>

      <section className="home-about">
        <h2>Founded by Ramanathan Sambandam</h2>
        <p>Bringing together the Berkeley community to foster mentorship, career guidance, and meaningful connections across generations.</p>
      </section>
    </div>
  );
};

export default Home;