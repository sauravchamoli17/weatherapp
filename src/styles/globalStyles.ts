import { Dimensions, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        width: Dimensions.get('screen').width, 
        height: Dimensions.get('screen').height
    }
});
