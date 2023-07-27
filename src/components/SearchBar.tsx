import React, { useState } from 'react';
import { getWeatherByCity } from './../API/weatherApi';

interface WeatherData {
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    timezone: number;
}

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [weatherData, setWeatherData] = useState<any | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await getWeatherByCity(searchTerm);
            setWeatherData(data);
            setSearchTerm('');
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter city name..."
                />
                <button type="submit">Search</button>
            </form>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Lat: {weatherData.coord.lat}°N</p>
                    <p>Lon: {weatherData.coord.lon}°E</p>
                    <p>Timezone: {weatherData.timezone}</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
