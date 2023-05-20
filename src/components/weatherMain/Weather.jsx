import React,{ useState } from 'react';
import axios from "axios";
import './weather.css';

export const Weather = () => {

    const [data,setData] = useState({});
    const [location,setLocation] = useState('');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a49390e270609a85ad2bff496ba3eb29`;

    const searchLocation = (event) =>{
        if(event.key === 'Enter'){
            axios.get(url).then((response)=>{
                setData(response.data);
                console.log(response.data);
            })
            setLocation('')
        }
       
    }
  return (
    <div className="app">
      <div className="search">
        <input
         type='text'
         value={location}
         onKeyPress={searchLocation}
         onChange={event => setLocation(event.target.value)}
         placeholder='Enter Location'
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className='bold'>{data.name}</p>
            <p>{data.sys?.country}</p>
          </div>
          <div className="temp">
            <h2>{data.main?.temp.toFixed()}°C</h2>
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name && <div className="bottom">
          <div className="feels">
            <p className='bold'>{data.main?.feels_like.toFixed()}°C</p>
            <p>Feels like</p>
          </div>
          <div className="humidity">
            <p className='bold'>{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className='bold'>{data.wind?.speed.toFixed()}KM/H</p>
            <p>Wind Speed</p>
          </div>
        </div>}
        
      </div>
    </div>
  )
}
