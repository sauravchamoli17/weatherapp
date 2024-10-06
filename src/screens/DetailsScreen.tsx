import React from 'react';
import { View, Image, ImageBackground, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import AppText from '../components/AppText';
import { weatherImages } from '../constants/weatherImages';
import { theme } from '../theme/theme';
import moment from 'moment';

const DetailScreen = ({ route }: any) => {
  const { weatherData } = route.params;
  const weatherConditionText = weatherData.day.condition.text.toLowerCase();
  const weatherImage = weatherImages[weatherConditionText] || { uri: `https:${weatherData.day.condition.icon}` };
  const metrics = [
    { label: 'Sunrise', value: `${weatherData.astro.sunrise}` },
    { label: 'Sunset', value: `${weatherData.astro.sunset}` },
    { label: 'Moonrise', value: `${weatherData.astro.moonrise}` },
    { label: 'Moonset', value: `${weatherData.astro.moonset}` },
    { label: 'Max Temp', value: `${weatherData.day.maxtemp_c}°C` },
    { label: 'Min Temp', value: `${weatherData.day.mintemp_c}°C` },
    { label: 'Avg Temp', value: `${weatherData.day.avgtemp_c}°C` },
    { label: 'Humidity', value: `${weatherData.day.avghumidity}%` },
    { label: 'Wind Speed', value: `${weatherData.day.maxwind_kph} kph` },
    { label: 'UV Index', value: `${weatherData.day.uv}` },
    { label: 'Visibility', value: `${weatherData.day.avgvis_km} km` },
    { label: 'Precipitation', value: `${weatherData.day.totalprecip_mm} mm` }
  ];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <ImageBackground source={require('../assets/bg.png')} style={{ flex: 1 }} blurRadius={70} resizeMode="cover">
        <View className="m-4 flex justify-around flex-1">
          <AppText className="text-white text-center text-3xl">
            {moment(weatherData.date).format('dddd, MMMM D')}
          </AppText>

          <AppText className="text-xl font-semibold text-gray-300 text-center">
              {weatherData.day.condition.text}
            </AppText>

          <View className="flex-row justify-center mb-4">
            <Image source={weatherImage} className="w-52 h-52" />
          </View>

          <View className="flex-row flex-wrap justify-between">
            {metrics.map((metric, index) => (
              <View
                key={index}
                className="flex justify-center items-center w-28 rounded-3xl py-3 mb-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <AppText className="text-white text-sm">{metric.label}</AppText>
                <AppText className="text-white text-xl font-semibold">{metric.value}</AppText>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailScreen;