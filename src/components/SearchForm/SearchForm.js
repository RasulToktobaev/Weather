import React, {useState} from 'react';

const SearchForm = ({getWeather, clearWeather}) => {

    const submitHandler = (event) => {
        event.preventDefault()
        let city = event.target[0].value

        getWeather(city)
    }


    return (
        <form className='search__form' onSubmit={submitHandler}>
            <input className='search__form-input'  type="text" placeholder={'Введите название города'}/>
            <button className='search__form-btn' type='submit'>Получить</button>
            <button onClick={clearWeather} type='button' className='search__form-button'>Очистить</button>
        </form>
    );
};

export default SearchForm;


