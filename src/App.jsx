import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Form from './pages/Form/Form';
import Profile from './pages/Profile/Profile';
import File from './pages/File/File';
import Transcribe from './pages/Transcribe/Transcribe';

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
        <Route path="/file" element={<File />} />
        <Route path="/transcribe" element={<Transcribe />} />
      </Routes>
    </>
  );
}

export default App;
