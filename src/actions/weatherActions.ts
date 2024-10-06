import { Dispatch } from 'redux';
import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from '../constants/actionTypes';
import { getForecastByCity } from '../api/weatherApi';
import { storeDataInAsyncStorage } from '../utils/storage';

export const fetchWeather = (city: string, days: number) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: FETCH_WEATHER_REQUEST });
        const weatherData = await getForecastByCity(city, days);

        if (weatherData) {
            dispatch({
                type: FETCH_WEATHER_SUCCESS,
                payload: weatherData,
            });
            await storeDataInAsyncStorage(weatherData);
        } else {
            dispatch({
                type: FETCH_WEATHER_FAILURE,
                error: 'No data found for the given city',
            });
        }
    } catch (error: any) {
        dispatch({
            type: FETCH_WEATHER_FAILURE,
            error: error.message || 'Failed to fetch weather data',
        });
    }
};