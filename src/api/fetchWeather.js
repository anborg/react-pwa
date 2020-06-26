import axios from 'axios';
const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

// async function - input name of the city.
export const fetchWeather = async(query) => {
    // we just want data from response, not whole response
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });
    return data;
}

