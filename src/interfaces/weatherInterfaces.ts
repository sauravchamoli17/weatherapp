export interface Astro {
    sunrise: string;
    sunset: string;
}

export interface Condition {
    text: string;
    icon: string;
}

export interface Day {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
}

export interface ForecastDay {
    date: string;
    day: Day;
    astro: Astro;
}

export interface Forecast {
    forecastday: ForecastDay[];
}

export interface Current {
    temp_c: number;
    condition: Condition;
    wind_kph: number;
    humidity: number;
}

export interface Location {
    name: string;
    country: string;
}

export interface WeatherData {
    current: Current;
    forecast: Forecast;
    location: Location;
}