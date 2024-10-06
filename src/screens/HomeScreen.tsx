import React from 'react';
import { View, ImageBackground, StatusBar, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { globalStyles } from '../styles/globalStyles';
import Forecast from '../components/Forecast';

const HomeScreen = () => {
  return (
    <View style={{ ...globalStyles.container }} className='relative'>
      <ScrollView>
        <StatusBar />
        <ImageBackground source={require('../assets/bg.png')} style={{ ...globalStyles.bgImage }} blurRadius={70} resizeMode="cover">
          <SearchBar />
          <Forecast />
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
