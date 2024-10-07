import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';
import { MagnifyingGlassIcon, XCircleIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import AppText from './AppText';
import AppInput from './AppInput';
import { getWeatherLocationsByCity } from '../api/weatherApi';
import store from '../store';
import { fetchWeather } from '../actions/weatherActions';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/appReducer';

interface Location {
    name: string;
    country: string;
}

const SearchBar: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dayCount = useSelector((state: RootState) => state.dayCount);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (city.length > 3) {
                setLoading(true);
                const locationResults: Location[] = await getWeatherLocationsByCity(city);
                setLocations(locationResults);
                setNoResults(locationResults.length === 0);
                setLoading(false);
            } else {
                setLocations([]);
                setNoResults(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [city]);

    const handleLocationSelect = (selectedCity: string) => {
        setCity(selectedCity);
        const locationData = locations.find(loc => loc.name === selectedCity);
        if (locationData) {
            store.dispatch(fetchWeather(selectedCity, dayCount));
        }
        handleClearInput();
    };

    const handleClearInput = () => {
        setCity('');
        setLocations([]);
        setNoResults(false);
        setSearchVisible(false);
    };

    return (
        <View className="m-4 z-50">
            <View style={{ height: '7%' }}>
                <View
                    className="flex-row justify-end items-center rounded-full"
                    style={{ backgroundColor: searchVisible ? theme.bgWhite(0.2) : 'transparent' }}
                >
                    {searchVisible && (
                        <AppInput
                            placeholder="Search city"
                            value={city}
                            onChangeText={setCity}
                            placeholderTextColor={'lightgray'}
                            className="pl-6 h-12 flex-1 text-base text-white"
                        />
                    )}
                    <TouchableOpacity
                        onPress={searchVisible ? handleClearInput : () => setSearchVisible(true)}
                        style={{ backgroundColor: theme.bgWhite(0.3) }}
                        className="rounded-full p-3"
                    >
                        {searchVisible ? (
                            <XCircleIcon size="25" color="white" />
                        ) : (
                            <MagnifyingGlassIcon size="25" color="white" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            {loading && searchVisible && (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl p-3">
                    <AppText className='text-black text-lg text-center'>Loading...</AppText>
                </View>
            )}
            {locations.length > 0 && !loading && searchVisible && (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                    {locations.map((loc, index) => (
                        <TouchableOpacity
                            key={index}
                            className="flex-row items-center border-0 p-3 px-4"
                            onPress={() => handleLocationSelect(loc.name)}
                        >
                            <MapPinIcon size="20" color="gray" />
                            <AppText className='text-black text-lg ml-2'>{loc.name}, {loc.country}</AppText>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {noResults && searchVisible && !loading && (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl p-3">
                    <AppText className='text-black text-lg text-center'>No results found</AppText>
                </View>
            )}
        </View>
    );
};

export default SearchBar;