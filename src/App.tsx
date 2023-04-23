import Daily from 'features/weather/weatherDaily/weatherDaily';
import Hourly from 'features/weather/weatherMonth/weatherHourly';
import Today from 'features/weather/weatherToday/weatherToday';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/header';

interface IAppProps {
  // Các props khác của Header
  handleToggle: () => void;
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/daily" element={<Daily />} />
        <Route path="/" element={<Today />} />
        <Route path="/hour" element={<Hourly />} />
      </Routes>
    </div>
  );
}

export default App;
