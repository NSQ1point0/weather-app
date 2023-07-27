import axios from 'axios';

const openWeatherApiKey = 'cc5a94b68a929f51ca8a8cadf8fb8662';
const openCageApiKey = 'cc5a94b68a929f51ca8a8cadf8fb8662';

const axiosInstance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
});

const geocodingInstance = axios.create({
    baseURL: 'http://api.openweathermap.org/geo/1.0',
});

export const getWeatherByCity = async (city: string) => {
    try {
        const geocodingResponse = await geocodingInstance.get('/direct', {
            params: {
                q: city,
                appid: openCageApiKey,
            },
        });

        const lat = geocodingResponse.data[0].lat;
        const lon = geocodingResponse.data[0].lon;

        const weatherResponse = await axiosInstance.get('/weather', {
            params: {
                lat: lat,
                lon: lon,
                appid: openWeatherApiKey,
            },
        });

        return weatherResponse.data;
    } catch (error) {
        throw new Error('Error fetching weather data');
    }
};