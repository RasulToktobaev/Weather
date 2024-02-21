import React from 'react';

const WeatherData = ({weather}) => {

    function millisecondsToDate(milliseconds) {
        const date = new Date();
        console.log(date.getTime())
        date.setTime(+(milliseconds + '000') );
        console.log(date)
        return `${date}`;
    }

    return (
        <div>
            <h2 className='title'>Название города : {weather.name}</h2>
           <ul className='weather__list'>
               <li className='weather__list-item'> <span className='weather__span'>Погода</span> : {weather.weather[0].main} <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt=""/> </li>
               <li className='weather__list-item'><span className='weather__span-two'>Температура</span> : {Math.round(weather.main.temp - 273.15)} °C </li>
               <li className='weather__list-item'><span className='weather__span-three'>Скорость ветра </span>: {weather.wind.speed} </li>
               <li className='weather__list-item'><span className='weather__span-four'>Влажность</span> : {weather.main.humidity } % </li>
               <li className='weather__list-item'><span className='weather__span-five'>Закат</span> : {millisecondsToDate(weather.sys.sunset)} </li>
               <li className='weather__list-item'><span className='weather__span-six'>Рассвет</span>: {millisecondsToDate(weather.sys.sunrise)}</li>
               <li className='weather__list-item'><span className='weather__span-seven'>Страна</span>: {weather.sys.country}</li>
           </ul>



        </div>
    );
};

export default WeatherData;