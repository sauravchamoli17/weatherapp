import React from 'react';
import { View, Image } from 'react-native';
import AppText from './AppText';

interface WeatherMetricProps {
    icon: any;
    value: string | number;
    unit: string;
}

const WeatherMetric: React.FC<WeatherMetricProps> = ({ icon, value, unit }) => {
    return (
        <View className="flex-row space-x-2 items-center">
            <Image source={icon} className="h-6 w-6" />
            <AppText className="text-white font-semibold text-base">
                {value} {unit}
            </AppText>
        </View>
    );
};

export default WeatherMetric;