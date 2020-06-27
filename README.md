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



git tag -a stage_01 -m "console log, axois result"
git push origin --tags


-- stage 2 ---
Edit App.js
- store the retrieved axios openweather data into state const 'weather'
- Display weather: 
 - {weather.main && ( <new html content to show weather data>)}, city-name, country as superscript, city-temp, icon
git tag -d stage_02
git tag -a stage_02 -m "render weather info - UI done"
git push origin --tags



--- stage 3 : Service Worker: offline message ----
All src/ work is over, now only /public
ServiceWorker
- send push notification to mobile?
- show some page offline

Edit public/index.html
- register script  'serviceWorker' in navigator => window.addEventListener(load, callback)
- add then() and catch()
- check if you see console logs.
- go to DevTools>Application>ServiceWorker -- Check X "Update on Reload"
- go to DevToos>Application>ClearStorage - ClearSiteData





touch public/serviceworker.js

Edit public/serviceworker.js
- CACHE_NAME - name of this application's cache
- urlsToCache

- Install ServiceWorker - cache offline pages, images
- Listen for requests - if a request is not fetchable return "offline.html"
- SW On "activate" - keep only cache "version-1", delete others

touch public/offline.html

edit offline.html - copy/paste


- go to console
- refresh check
- chenage network>offline, and see offline.html


touch public\manifest.json
- specify info about application
- icons are the important part

git tag -a stage_03-ServiceWorker_offlineMode_installableApp -m "Added ServiceWorker hook, offline page, installable PWA app"
git push origin --tags


Build Production:
npm run build
- deploy this build folder


//To enable https
set HTTPS=true&&npm start

//to redirect all http to https - use nginx or apache
npm install --save react-https-redirect

//To install - click (+) sign in browser