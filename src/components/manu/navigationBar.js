import React, {useContext, useState} from 'react';
import { View, TouchableOpacity, Text, Animated, Easing  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import {RouteContext} from "../context/routeProvider";

export default function NavigationBar() {

    const navigation = useNavigation();
    const { route, setRoute } = useContext(RouteContext);

    const [isExpanded, setIsExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));


    const getColor = (screenName) => {
        return route === screenName ? '#8a2be2' : 'gray';
    };

    const getLabelColor = (screenName) => {
        return route === screenName ? 'text-purple-600' : 'text-gray-500';
    };

    const navigator = (value) => {
        navigation.navigate(value)
        setRoute(value)
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(animation, {
            toValue: isExpanded ? 0 : 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const buttonAStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60],
                }),
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60],
                }),
            },
        ],
        opacity: animation,
    };

    const buttonBStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60],
                }),
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 60],
                }),
            },
        ],
        opacity: animation,
    };

    return (
        <View className="flex-row items-center justify-around bg-white py-3 shadow-md">
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigator('Home')}>
                <FontAwesome6 name="house-chimney" size={24} color={getColor('Home')} />
                <Text className={`text-xs ${getLabelColor('Home')}`}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigator('Transaction')}>
                <MaterialCommunityIcons name="swap-horizontal-bold" size={24} color={getColor('Transaction')} />
                <Text className={`text-xs ${getLabelColor('Transaction')}`}>Transaction</Text>
            </TouchableOpacity>
            <View className="flex-none items-center relative">
                <Animated.View style={[buttonAStyle, { position: 'absolute', zIndex: 10 }]}>
                    <TouchableOpacity className="items-center bg-purple-200 p-3 rounded-full">
                        <Text className="text-white">A</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[buttonBStyle, { position: 'absolute', zIndex: 10 }]}>
                    <TouchableOpacity className="items-center bg-purple-200 p-3 rounded-full">
                        <Text className="text-white">B</Text>
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity className="items-center bg-purple-200 p-3 rounded-full" onPress={toggleExpand}>
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigator('Budget')}>
                <Fontisto name="pie-chart-2" size={24} color={getColor('Budget')} />
                <Text className={`text-xs ${getLabelColor('Budget')}`}>Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigator('Profile')}>
                <Ionicons name="person" size={24} color={getColor('Profile')} />
                <Text className={`text-xs ${getLabelColor('Profile')}`}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}
