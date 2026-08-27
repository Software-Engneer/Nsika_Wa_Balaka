import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import Home from './components/pages/Home';
import Categories from './components/pages/Categories';
import News from './components/pages/News';
import Sports from './components/pages/Sports';
import Events from './components/pages/Events';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import SignOut from './components/pages/SignOut';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/events" element={<Events />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/messages" element={<Home />} />
            <Route path="/notifications" element={<Home />} />
            <Route path="/profile" element={<Home />} />
            <Route path="/create" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/logout" element={<SignOut />} />
          </Routes>
      <Footer />
    </Router>
  );
}

export default App;