import { ForecastDay } from "../interfaces/weatherInterfaces";

export type RootStackParamList = {
    Home: undefined;
    Details: { weatherData: ForecastDay };
  };
  