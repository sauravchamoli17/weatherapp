import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailsScreen';
import { globalStyles } from '../styles/globalStyles';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{ ...globalStyles.container }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Weather App', headerShown: false }} />
          <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Weather Details', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
};

export default AppNavigator;