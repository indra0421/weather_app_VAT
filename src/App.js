import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY ,
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  
  const search = evt => {

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });



  }
const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search your cities here..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onClick={(e) => e.key === 'Enter' ? search() : null}
          />
          <button onClick={search} title="Search"><SearchIcon className='search_icon' /></button>

        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            <div className="timezone">
            {(() => {
    // Destructure data from your weather object

    const timezone = weather.timezone; // offset in seconds

   
    // Convert timezone offset to readable UTC string (e.g. +5h 30m)
    const hours = Math.floor(timezone / 3600);
    const minutes = Math.floor((timezone % 3600) / 60);
    const sign = timezone >= 0 ? '+' : '-';

    return (
      <>
     
        <p>🕒 Timezone: UTC {sign}{Math.abs(hours)}h {Math.abs(minutes)}m</p>
      </>
    );
  })()} </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
                
                
              </div>
              
               <div className="feels-like">

          
              <h3> Feels Like : {Math.round(weather.main.feels_like)}°c </h3>
              </div>
              <div className="wind">

              
              <p> <img width="30" height="30" src="https://img.icons8.com/ios/50/wind--v1.png" alt="wind--v1"/> {weather.wind.speed} mph</p>
              </div>
               <div className="humidity">

              
              <p><img width="30" height="30" src="https://img.icons8.com/badges/48/humidity.png" alt="humidity"/>{weather.main.humidity} %</p>
              </div>
              <div className="weather">

                {`${weather.weather[0].main}`}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
