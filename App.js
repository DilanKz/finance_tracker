import OnboardScreen from "./src/screens/onBoardingScreen";
import LandingScreen from "./src/screens/landingScreen";

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Loading'} screenOptions={{headerShown: false}}>
                <Stack.Screen name="Loading" component={LandingScreen}/>
                <Stack.Screen name="onBoard" component={OnboardScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
