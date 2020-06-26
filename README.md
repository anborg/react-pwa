# react-pwa


npx create-react-app ./

delete src

cleanup comments public/index.html

create src/App.js - basic app functional component, export

create src/index.js
    - import App component
    - render <App/> in 'root'


# webservice lib
npm install --save axios
mkdir src/api
touch src\api\fetchaWeather.js

fetchWeather() - fetch {data} from openweather using axios
E App.js 
- import fetchWeather()
- import css 

touch src\App.css

E App.js
 - create "main-container" <div>
 - add search "input" field
 - import useState hook, and bind states value to 'query', onChange to 'setQuery', oneKeyPress to a "callWeatherApi"

