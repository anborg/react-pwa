import React from 'react';
import {fetchWeather} from './api/fetchWeather';

//Import styles so you don't need to type all css
import './App.css'

//State - useState hook
import {useState} from 'react';


// function component
const App = () => {
    const[query, setQuery] = useState(''); // binds this variables? 
    
    const[weather, setWeather] = useState({});//store openweather data in this state

    const search = async(e) => {
        if(e.key === 'Enter'){
            const data = await fetchWeather(query) 
            //console.log(data);
            setWeather(data);
            setQuery(''); // once weather is retrived and stored, reset the input field
        }
    }


    //create main-container, input field
    // value and onChange are IMPORTANT, must come from state
    return (
        <div className="main-container">
                <label>First name:
                <input id="searchfield" type="text" className="search" placeholder="Which city? ..."
                    value={query}
                    onChange={ (e) => setQuery(e.target.value)}  
                    onKeyPress={search}
                    // check Tutorial Event & Input handling.
                />
                </label>
                {weather.main && ( // If weather data is retrived successfuly, display the content
                    <div className="city">
                        <h2 className="cityName">
                            <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup> 
                        </h2>                    
                        <div className="city-temp">
                            {Math.round(weather.main.temp)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className="info">
                            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>
                )}
        </div>
    
    );
}

//Export that component - so it can be imported in index.js
export default App;
