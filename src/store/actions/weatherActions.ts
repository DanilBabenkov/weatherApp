import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {WeatherAction, WeatherData, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR} from '../types';

export const getWeather = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
    console.log("city", city);
    return async dispatch => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${city}&appid=8766df0641ad61a17d1444e01beb9141`);

            if(!res.ok) {
                const resData: WeatherError = await res.json();
                throw new Error(resData.message);
            }

            const resData: WeatherData = await res.json();
            console.log("resData", resData);
            dispatch({
                type: GET_WEATHER,
                payload: resData
            });
        }catch(err) {
            dispatch({
                type: SET_ERROR,
                payload: err.message
            });
        }
    }
}

export const setLoading = (): WeatherAction => {
    return {
        type: SET_LOADING
    }
}

export const setError = (): WeatherAction => {
    return {
        type: SET_ERROR,
        payload: ''
    }
}