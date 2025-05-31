import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Form from './pages/Form/Form';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import Verification from './pages/Verification/Verification';
import Match from './pages/Match/Match';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </>
  );
}

export default App;