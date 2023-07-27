import React from 'react';
import WeatherDetails from './components/WeatherDetails';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <WeatherDetails />
    </div>
  );
};

export default App;