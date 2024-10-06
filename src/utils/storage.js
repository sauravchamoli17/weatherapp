import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_CITY = 'selectedCity';
const STORAGE_KEY_FORECAST = 'forecastData';

export const storeDataInAsyncStorage = async (forecast: any) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY_CITY, forecast.location.name);
        await AsyncStorage.setItem(STORAGE_KEY_FORECAST, JSON.stringify(forecast));
    } catch (error) {
        console.error('Failed to save data in AsyncStorage:', error);
    }
};

export const getCityFromAsyncStorage = async () => {
    try {
        const city = await AsyncStorage.getItem(STORAGE_KEY_CITY);
        return city ? city : null;
    } catch (error) {
        console.error('Failed to retrieve city from AsyncStorage:', error);
        return null;
    }
};

export const getForecastFromAsyncStorage = async () => {
    try {
        const forecast = await AsyncStorage.getItem(STORAGE_KEY_FORECAST);
        return forecast ? JSON.parse(forecast) : null;
    } catch (error) {
        console.error('Failed to retrieve forecast from AsyncStorage:', error);
        return null;
    }
};