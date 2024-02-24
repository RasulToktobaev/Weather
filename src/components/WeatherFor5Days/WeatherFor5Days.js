
import React, { useEffect, useState } from 'react';

const WeatherCard = ({ weather, onClick, active, timeInterval }) => {
    const getAverageTemp = (weather) => {
        return Math.round(weather.main.temp - 273.15);
    };

    const getIcon = (weather) => {
        return weather.weather[0].icon;
    };

    return (
        <li className={`${active === weather.dt_txt.slice(0, 10) ? 'active' : ''}`} onClick={onClick}>
            <p className='weather__date'>Дата : {weather.dt_txt.slice(0, 10).toLocaleString('ru')}</p>
            {timeInterval &&
            <p className='weather__time'>Время : {timeInterval}</p>}
            <p className='weather__temp'>Температура : {getAverageTemp(weather)} °C </p>
            <p className='weather__icon'>Иконка : <img src={`https://openweathermap.org/img/wn/${getIcon(weather)}.png`} alt="" /></p>
        </li>
    );
};

const WeatherFor5Days = ({ weather }) => {
    const [weather5Days, setWeather5Days] = useState([]);
    const [weather5DaysAll, setWeather5DaysAll] = useState(null);
    const [active, setActive] = useState(null);

    const getWeatherFor5Days = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${weather.name}&appid=658f7544c630f4343c4f4fa0de1f116a`)
            .then((res) => res.json())
            .then((res) => {
                const weathersFiltered = res.list?.reduce((acc, weather) => {
                    const current = acc.find(item => item.dt_txt.slice(0, 10) === weather.dt_txt.slice(0, 10))
                    if (!current) {
                        return acc.concat([weather])
                    }
                    return acc
                }, [])
                setWeather5Days(weathersFiltered)
                setWeather5DaysAll(res.list)
            })
    }

    useEffect(() => {
        getWeatherFor5Days()
    }, [])

    return (
        <div>
            <ul className='weather__list-for'>
                {
                    weather5Days.map((weather) => (
                        <WeatherCard
                            key={weather.dt_txt}
                            onClick={() => setActive(weather.dt_txt.slice(0, 10))}
                            weather={weather}
                        />
                    ))
                }
            </ul>

            <ul className='dates'>
                {
                    active && weather5DaysAll && weather5DaysAll
                        .filter((item) => item.dt_txt.slice(0, 10) === active)
                        .map((item, index) => (
                            <WeatherCard
                                key={item.dt_txt}
                                weather={item}
                                active={active}
                                timeInterval={item.dt_txt.slice(11, 16)}
                            />
                        ))
                }
            </ul>
        </div>
    );
};

export default WeatherFor5Days;
