import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import { theme } from '../theme/theme';

interface ErrorProps {
    message: string;
    onRetry: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <AppText className="text-white text-center text-lg">{message}</AppText>
            <TouchableOpacity
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 m-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
                onPress={onRetry}
            >
                <AppText className="text-white">Retry</AppText>
            </TouchableOpacity>
        </View>
    );
};

export default Error;