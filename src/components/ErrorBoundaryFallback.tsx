import React from 'react';
import AppText from './AppText';
import { Button, View } from 'react-native';

const ErrorBoundaryFallback = (props: { error: Error, resetError: Function }) => (
    <View>
        <AppText>Something happened!</AppText>
        <AppText>{props.error.toString()}</AppText>
        <Button onPress={() => props.resetError()} title={'Try again'} />
    </View>
)

export default ErrorBoundaryFallback;