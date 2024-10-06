import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import AppText from './AppText';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/appReducer';
import NetInfo from '@react-native-community/netinfo';
import { getCityFromAsyncStorage, getForecastFromAsyncStorage } from '../utils/storage';
import moment from 'moment';
import { weatherImages } from '../constants/weatherImages';
import store from '../store';
import { fetchWeather } from '../actions/weatherActions';
import DailyForecast from './DailyForecast';
import Loading from './Loading';
import { WeatherData } from '../interfaces/weatherInterfaces';
import Error from './Error';
import WeatherMetric from './WeatherMetric';
import DaysModal from './DaysModal';

const Forecast: React.FC = () => {
    const forecast = useSelector((state: RootState) => state.weather.forecast);
    const loading = useSelector((state: RootState) => state.weather.loading);
    const error = useSelector((state: RootState) => state.weather.error);
    const [offlineForecast, setOfflineForecast] = useState<any>(null);
    const [dayCount, setDayCount] = useState(3);

    const retryFetchWeather = async () => {
        const location = await getCityFromAsyncStorage();
        if (location) {
            store.dispatch(fetchWeather(location, dayCount));
        }
    };

    useEffect(() => {
        const loadStoredData = async () => {
            const location = await getCityFromAsyncStorage();
            const forecast = await getForecastFromAsyncStorage();
            const days = forecast?.forecast?.forecastday.length;

            if (location) {
                const count = days ? days : dayCount;
                if (days) {
                    setDayCount(days);
                }
                store.dispatch(fetchWeather(location, count));
            }
        };
        loadStoredData();
    }, []);

    useEffect(() => {
        const fetchOfflineForecast = async () => {
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected) {
                const forecastData = await getForecastFromAsyncStorage();
                if (forecastData) {
                    setOfflineForecast(forecastData);
                }
            }
        };

        fetchOfflineForecast();
    }, []);

    const displayForecast: WeatherData | null = forecast || offlineForecast;

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return <Error message="Something went wrong!" onRetry={retryFetchWeather} />;
    }

    if (!displayForecast) {
        return (
            <View className="flex-1 justify-center items-center">
                <AppText className="text-white text-center text-lg">
                    Please search for a location to see the weather forecast.
                </AppText>
            </View>
        );
    }

    const sunriseTime = displayForecast.forecast.forecastday[0]?.astro?.sunrise || 'N/A';
    const weatherConditionText = displayForecast.current?.condition?.text || 'Unknown';
    const weatherImage = weatherImages[weatherConditionText.toLowerCase()] || { uri: `https:${displayForecast.current?.condition?.icon}` };
    const dailyForecastData = displayForecast?.forecast?.forecastday;

    return (
        <View className="m-4 flex justify-around flex-1 mb-8">
            <AppText className="text-white text-center text-2xl">
                {displayForecast.location.name},&nbsp;
                <AppText className="text-lg font-semibold text-gray-300">
                    {displayForecast.location.country}
                </AppText>
            </AppText>
            <View className="flex-row justify-center">
                <Image source={weatherImage} className="w-52 h-52" />
            </View>
            <View className="space-y-2">
                <AppText className="text-center font-semibold text-white text-6xl mt-5">
                    {displayForecast.current.temp_c}°C
                </AppText>
                <AppText className="text-center text-white text-xl tracking-widest">
                    {weatherConditionText}
                </AppText>
            </View>
            <View className="flex-row justify-between mx-4">
                <WeatherMetric icon={require('../assets/icons/wind.png')} value={displayForecast.current.wind_kph} unit="km/h" />
                <WeatherMetric icon={require('../assets/icons/drop.png')} value={displayForecast.current.humidity} unit="%" />
                <WeatherMetric icon={require('../assets/icons/sun.png')} value={sunriseTime !== 'N/A' ? moment(sunriseTime, "h:mm A").format("hh:mm A") : 'N/A'} unit="" />
            </View>
            <View className="mb-4 space-y-3">
                <DaysModal dayCount={dayCount} setDayCount={setDayCount} locationName={displayForecast.location.name} />
                <DailyForecast forecastData={dailyForecastData} />
            </View>
        </View>
    );
};

export default Forecast;