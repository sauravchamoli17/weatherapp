import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import AppText from './AppText';
import { theme } from '../theme/theme';

const Loading: React.FC = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Bar
                progress={0.7}
                width={200}
                height={10}
                color={theme.colors.white}
                unfilledColor={theme.bgWhite(0.15)}
            />
            <AppText className="text-white mt-4">Loading...</AppText>
        </View>
    );
};

export default Loading;