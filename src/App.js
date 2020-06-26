import React from 'react';
import {fetchWeather} from './api/fetchWeather';

//Import styles so you don't need to type all css
import './App.css'

//State - useState hook
import {useState} from 'react';


// function component
const App = () => {
    const[query, setQuery] = useState(''); // binds this variables? 
    const search = async(e) => {
        if(e.key === 'Enter'){
            const data = await fetchWeather(query) 
            console.log(data);
        }
    }


    //create main-container, input field
    // value and onChange are IMPORTANT, must come from state
    return (
        <div className="main-container">
                <input type="text" className="search" 
                    placeholder="Which city? ..."
                    value={query}
                    onChange={ (e) => setQuery(e.target.value)}  
                    onKeyPress={search}
                    // check Tutorial Event & Input handling.
                />
        </div>
    
    );
}

//Export that component - so it can be imported in index.js
export default App;
