import React from 'react';
import { View, ImageBackground, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import SearchBar from '../components/SearchBar';
import { fetchWeather } from '../actions/weatherActions';
import store from '../store';
import { globalStyles } from '../styles/globalStyles';
import Forecast from '../components/Forecast';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ ...globalStyles.container }} className='relative'>
      <StatusBar />
      <ImageBackground source={require('../assets/bg.png')} style={{ ...globalStyles.bgImage }} blurRadius={70} resizeMode="cover">
        <SearchBar />
        <Forecast />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
