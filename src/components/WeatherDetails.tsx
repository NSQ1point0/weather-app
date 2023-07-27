import React, { useState, useEffect } from 'react';
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

const WeatherDetails: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const city = 'Mumbai';
        fetchWeatherData(city);
    }, []);

    const fetchWeatherData = async (city: string) => {
        try {
            const data = await getWeatherByCity(city);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{weatherData.name}</h2>
            <p>Lat: {weatherData.coord.lat}°N</p>
            <p>Lon: {weatherData.coord.lon}°E</p>
            <p>Timezone: {weatherData.timezone}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
    );
};

export default WeatherDetails;