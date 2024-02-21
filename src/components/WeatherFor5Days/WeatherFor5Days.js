import React, {useEffect, useState} from 'react';

const WeatherFor5Days = ({weather}) => {

    const [weather5Days, setWeather5Days] = useState(null)

    const  [active, setActive] = useState(null)


    const getWeatherFor5Days = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${weather.name}&appid=658f7544c630f4343c4f4fa0de1f116a`)
            .then((res) => res.json())
            .then((res) => setWeather5Days(res))
    }

    useEffect(() => {
      getWeatherFor5Days()
    }, [])

    console.log()

    const getMediumTemp = (date) => {
        let count = 0;
        const sumTemp = weather5Days.list.reduce((acc, res) => {
            if (res.dt_txt.includes(date)) {
                count++;
                return acc + res.main.temp;
            }
            return acc;
        }, 0);
        return sumTemp / count;
    };

    const getIcon = (date) => {
        return weather5Days.list.find((item) =>item.dt_txt.includes(date)).weather[0].icon
    }




    return (
        <div>

            <ul className='weather__list-for'>
                {
               weather5Days && [...new Set (weather5Days.list.map((item) => item.dt_txt.slice(0,10)))]
                       .map((item) => {
                           return {date:item, temp: getMediumTemp(item), icon:getIcon(item)}
                       }).map((item) => (
                            <li className={`${active === item.date ? 'active' : ''}`} onClick={() => setActive(item.date)}>
                                <p>Дата : {item.date}</p>
                                <p>Температура : {Math.round(item.temp - 273.15)} °C </p>
                                <p>Иконка : <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt=""/></p>
                            </li>
                        ))
                }
            </ul>


            <ul className='dates'>
                {
                   active && weather5Days && weather5Days.list.filter((item) => item.dt_txt.includes(active)).map((item) => (
                       <li>
                           <p>Время : {item.dt_txt.slice(10)}</p>
                           <p>Температура : {Math.round(item.main.temp - 273.15)} °C</p>
                           <p>Иконка : <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt=""/></p>
                       </li>
                    ))


                }
            </ul>

        </div>
    );
};

export default WeatherFor5Days;