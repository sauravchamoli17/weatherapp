import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppText from './AppText';
import { weatherImages } from '../constants/weatherImages';
import { theme } from '../theme/theme';
import moment from 'moment';
import { ForecastDay } from '../interfaces/weatherInterfaces';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../constants/navigationTypes';

interface DailyForecastProps {
    forecastData: ForecastDay[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecastData }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View className="my-4 space-y-3">
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 8 }}
                showsHorizontalScrollIndicator={false}
            >
                {forecastData.map((day: ForecastDay, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('Details', { weatherData: day })}
                        className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{ backgroundColor: theme.bgWhite(0.15) }}
                    >
                        <Image
                            source={weatherImages[day.day.condition.text] || { uri: `https:${day.day.condition.icon}` }}
                            className="h-11 w-11"
                        />
                        <AppText className="text-white">{moment(day.date).format('MMMM D')}</AppText>
                        <AppText className="text-white text-xl font-semibold">
                            {day.day.maxtemp_c}° C
                        </AppText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default DailyForecast;