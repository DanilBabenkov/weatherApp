import React, {FC, useState, useEffect, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { usePosition } from 'use-position';
import {TextField, AppProvider, Button} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import { setAlert } from '../store/actions/alertActions';
import { getWeather, setLoading } from '../store/actions/weatherActions';

interface SearchProps {
    title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
    const dispatch = useDispatch();
    const { latitude, longitude} = usePosition(true);
    const [city, setCity] = useState('');
    useEffect(() => {
        dispatch(setLoading());
        dispatch(getWeather(`lon=${longitude}&lat=${latitude}`));
    }, [longitude, latitude]);

    const changeHandler = useCallback((newValue) => setCity(newValue), []);

    const submitHandler = () => {
        //e.preventDefault();

        if(city.trim() === '') {
            return dispatch(setAlert('City is required!'));
        }

        dispatch(setLoading());
        dispatch(getWeather(`q=${city}`));
        setCity('');
    }

    return(
        <div className="hero is-light has-text-centered">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">{title}</h1>
                    <form className="py-5" style={{width: '400px', margin: '0 auto'}}>
                        <AppProvider i18n={en}>
                            <TextField
                                type="text"
                                label="Enter city name"
                                value={city}
                                onChange={changeHandler} />
                            <Button primary={true} onClick={submitHandler}>Search</Button>
                        </AppProvider>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Search;