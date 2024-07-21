// ** React Imports
import React from 'react';

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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Transaction" component={TransactionScreen} />
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

export default function MainScreen () {
    return (
        <View className="flex-1">
            <Stack.Navigator initialRouteName={'Home'}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Transaction" component={TransactionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Budget" component={BudgetScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
            <NavigationBar />
        </View>
    );
};

