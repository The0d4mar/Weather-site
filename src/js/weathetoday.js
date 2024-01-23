import '../scss/wather.scss'

import {api, exportData} from './main.js'
const days =["Воскр.", "Пон.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб."];
let city = exportData['name'];
let date = new Date();
let month, day, year;
const cityName__block = document.querySelector('.head__cityName');
const cityDate__block = document.querySelector('.head__date');



cityName__block.textContent = city;
month = date.toLocaleString('default', { month: 'short' }).charAt(0).toUpperCase() + name.slice(1);
day = date.getDay();
year = date.getFullYear() % 100;
cityDate__block.textContent = `${month} ${day}, ${days[day]} `

window.addEventListener('load', () => {
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${exportData['lat']}&lon=${exportData['long']}&appid=${api}`;
        
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
  
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const tempC = String((temp.toFixed(2) - 273.15).toFixed(1));
  
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);
            console.log(sunsetGMT);
  
          });
    }
  );
