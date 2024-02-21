import SearchForm from "./components/SearchForm/SearchForm";
import WeatherData from "./components/WeatherData/WeatherData";
import {useState} from "react";
import './style.scss'
import WeatherFor5Days from "./components/WeatherFor5Days/WeatherFor5Days";

function App() {

    const [weather, setWeather] = useState(null)

    const getWeather = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=658f7544c630f4343c4f4fa0de1f116a`)
            .then((res) => res.json())
            .then((res) => {
                if (res.cod === 200) {
                    setWeather(res)
                } else {
                    alert('Ошибка : Неправильный город')
                }
            })

    }

    const clearWeather = () => {
        setWeather(null)
    }


    return (
        <div className="App">

            <SearchForm getWeather={getWeather} clearWeather={clearWeather}/>

            {
                weather && <WeatherData weather={weather}/>
            }

            {
                weather && <WeatherFor5Days weather={weather}/>
            }

        </div>
    );
}

export default App;





