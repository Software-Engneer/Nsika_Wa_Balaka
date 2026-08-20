import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import './App.css';


function App() {
  return (
    <Router>
      <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
    </Router>
  );
}

export default App;