import React, {useState} from 'react'
import './App.css';

const api = {
  key: "222e64b90a779b274945204b1d4ffe46",
  base:  "https://api.openweathermap.org/data/2.5/"
}


function App() {
const [query, setQuery] = useState('')
const [weather, setWeather] = useState('')

const search = event => {
  if(event.key === "Enter"){
    fetch(`${api.base}weather?q=${query}&units=imperial&metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result);
    })
  }
}

  const dateBuilder =(d) => {
    let months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${month} ${date}, ${year}`
  }
  return (
    <div className="App">
      <header className="header">Today's Weather Forecast</header>
    <main>
      <div className="search-box">
    <input type="text" className="search-bar" placeHolder=" Search by City..."
    onChange={event => setQuery(event.target.value)}
    value= {query}
    onKeyPress={search}
    /> 
      </div>
      {(typeof weather.main != "undefined") ? (
        <div className="weather-box">
      <div >
        <div className="location"> {weather.name}, {weather.sys.country}</div> 
        <div className="date">{dateBuilder(new Date())}</div>
      
        </div>

        <div>
          <div className="temp"> {weather.main.temp} ºF</div>
          <div className="weather"> {weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
    </main>
    </div>
  );
}

export default App;
