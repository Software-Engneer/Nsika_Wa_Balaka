import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Registration from './components/pages/Registration';
import SignIn from './components/pages/SignIn';
import SignOut from './components/pages/SignOut';
import './App.css';


function App() {
  return (
    <Router>
      <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/logout" element={<SignOut />} />
          </Routes>
    </Router>
  );
}

export default App;