import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Box from './pages/Box'; // Import the Box component

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/boxes/:id" element={<Box />} /> {/* Dynamic route for Box */}
    </Routes>
  </BrowserRouter>
);

export default App;
