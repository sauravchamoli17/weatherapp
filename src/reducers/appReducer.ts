import { STORE_LOCATION, STORE_FORECAST, FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from '../constants/actionTypes';

interface AppState {
  selectedLocation: any;
  weather: {
    loading: boolean;
    forecast: any;
    error: string | null;
  };
}

const initialState: AppState = {
  selectedLocation: null,
  weather: {
    loading: false,
    forecast: null,
    error: null,
  },
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STORE_LOCATION:
      return { ...state, selectedLocation: action.payload };
    case FETCH_WEATHER_REQUEST:
      return { ...state, weather: { ...state.weather, loading: true, error: null } };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, weather: { loading: false, forecast: action.payload, error: null } };
    case FETCH_WEATHER_FAILURE:
      return { ...state, weather: { loading: false, forecast: null, error: action.error } };
    case STORE_FORECAST:
      return { ...state, weather: { ...state.weather, forecast: action.payload } };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;