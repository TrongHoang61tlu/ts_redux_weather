import React from 'react';
import './App.css';
import Header from './components/Layout/header';
import { Route, Routes } from 'react-router-dom';
import Today from 'features/weather/weatherToday/weatherToday';
import Daily from 'features/weather/weatherDaily/weatherDaily';
import Month from 'features/weather/weatherMonth/weatherMonth';

interface IAppProps {
  // Các props khác của Header
  handleToggle: () => void;
}

function App() {
  
  return (
    <div>
      <Header  />
      <Routes>
        <Route path="/daily" element={<Daily/>} />
        <Route path="/" element={<Today/>} />
        <Route path="/month" element={<Month/>} />
      </Routes>
    </div>
  );
}

export default App;
