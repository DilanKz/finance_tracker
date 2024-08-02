import OnboardScreen from "./src/screens/onBoardingScreen";
import LandingScreen from "./src/screens/landingScreen";
import MainScreen from "./src/screens/mainScreen";

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTransactionScreen from "./src/screens/tabs/addTransactionScreen";
import {UserProvider} from "./src/components/context/userProvider";
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();
export default function App() {

    return (
        <UserProvider>
            <NavigationContainer>
                <ToastProvider>
                    <Stack.Navigator initialRouteName={'Loading'} screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Loading" component={LandingScreen}/>
                        <Stack.Screen name="onBoard" component={OnboardScreen}/>
                        <Stack.Screen name="main" component={MainScreen}/>
                        <Stack.Screen name="Income" component={AddTransactionScreen} options={{headerShown: false}}
                                      initialParams={{type: 'income'}}/>
                        <Stack.Screen name="Expense" component={AddTransactionScreen} options={{headerShown: false}}
                                      initialParams={{type: 'expense'}}/>
                    </Stack.Navigator>
                </ToastProvider>
            </NavigationContainer>
        </UserProvider>
    );
}
