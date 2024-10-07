import React from 'react';
import { View } from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import AppText from './AppText';
import ModalSelector from 'react-native-modal-selector';
import { fetchWeather } from '../actions/weatherActions';
import store from '../store';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/appReducer';
import { STORE_DAYS_COUNT } from '../constants/actionTypes';

interface DaysModalProps {
    locationName: string;
}

const DaysModal: React.FC<DaysModalProps> = ({ locationName }) => {
    const dayCount = useSelector((state: RootState) => state.dayCount);

    const handleDayCountChange = (option: { key: number }) => {
        store.dispatch({ type: STORE_DAYS_COUNT, payload: option.key });
        store.dispatch(fetchWeather(locationName, option.key));
    };

    return (
        <View className="flex-row items-center mx-3 space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <AppText className="text-white text-base">Daily forecast</AppText>
            <ModalSelector
                data={[...Array(10).keys()].map(value => ({
                    key: value + 1,
                    label: `${value + 1} day${value > 0 ? 's' : ''}`
                }))}
                initValue={`${dayCount} day${dayCount > 1 ? 's' : ''}`}
                onChange={handleDayCountChange}
            />
        </View>
    );
};

export default DaysModal;