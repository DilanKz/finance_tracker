// ** React Imports
import React, {useState} from 'react';

// ** React Native Imports
import { View, Text } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";

// ** Custom Component Imports
import NavigationBar from '../components/manu/navigationBar';
import HomeScreen from "./tabs/homeScreen";
import TransactionScreen from "./tabs/transactionScreen";
import BudgetScreen from "./tabs/budgetScreen";
import ProfileScreen from "./tabs/profileScreen";
import CustomTabBar from "../components/manu/customTabBar";
import {RouteProvider} from "../components/context/routeProvider";

const Stack = createStackNavigator();

export default function MainScreen () {

    const [route, setRoute] = useState('Home');

    return (
        <RouteProvider>
            <View className="flex-1">
                <Stack.Navigator initialRouteName={'Home'}>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Transaction" component={TransactionScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Budget" component={BudgetScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
                <NavigationBar />
            </View>
        </RouteProvider>
    );
};

