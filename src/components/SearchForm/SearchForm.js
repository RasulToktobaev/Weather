import React, {useState} from 'react';

const SearchForm = ({getWeather, clearWeather}) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        const cityInput =  event.target[0]
        const city = cityInput.value


        if(city){
            getWeather(city)
           cityInput.value = ''
        }
    }


    return (
        <form className='search__form' onSubmit={handleSubmit}>
            <input className='search__form-input'  type="text" placeholder={'Введите название города'}/>
            <button className='search__form-btn' type='submit'>Получить</button>
            <button onClick={clearWeather} type='button' className='search__form-button'>Очистить</button>
        </form>
    );
};

export default SearchForm;


