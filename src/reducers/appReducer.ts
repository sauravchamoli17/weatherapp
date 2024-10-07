import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, STORE_DAYS_COUNT } from '../constants/actionTypes';

interface AppState {
  dayCount: number;
  weather: {
    loading: boolean;
    forecast: any;
    error: string | null;
  };
}

const initialState: AppState = {
  weather: {
    loading: false,
    forecast: null,
    error: null,
  },
  dayCount: 3
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, weather: { ...state.weather, loading: true, error: null } };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, weather: { loading: false, forecast: action.payload, error: null } };
    case FETCH_WEATHER_FAILURE:
      return { ...state, weather: { loading: false, forecast: null, error: action.error } };
    case STORE_DAYS_COUNT:
      return { ...state, dayCount: action.payload };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;