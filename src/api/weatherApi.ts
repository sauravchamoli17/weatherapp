import axios, { AxiosResponse } from 'axios';
import { API_KEY, API_BASE_URL } from '@env';

interface LocationParams {
  city: string;
}

interface ForecastParams {
  city: string;
  days: number;
}

const locationEndpoint = (params: LocationParams) =>
  `${API_BASE_URL}/search.json?key=${API_KEY}&q=${params.city}`;

const forecastEndpoint = (params: ForecastParams) =>
  `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${params.city}&days=${params.days}`;

const apiCall = async <T>(endpoint: string): Promise<T | null> => {
  // console.log(endpoint, 'endpoint');  
  const options = { method: 'GET', url: endpoint };
  try {
    const response: AxiosResponse<T> = await axios.request(options);
    // console.log(response.data, 'response');
    return response.data;
  } catch (error) {
    console.log('Error fetching data:', error);
    return null;
  }
}

export const getWeatherLocationsByCity = async (city: string) => {
  const locationData = await apiCall(locationEndpoint({ city }));
  return locationData || [];
};

export const getForecastByCity = (city: string, days: number = 3) => {
  return apiCall(forecastEndpoint({ city, days }));
};