import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, FontAwesome6, MaterialCommunityIcons, Fontisto, AntDesign } from '@expo/vector-icons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View className="relative flex-row items-center justify-around bg-white py-3 shadow-md">
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const color = isFocused ? '#8a2be2' : 'gray';
                const labelColor = isFocused ? 'text-purple-600' : 'text-gray-500';

                const icons = {
                    Home: <FontAwesome6 name="house-chimney" size={24} color={color} />,
                    Transaction: <MaterialCommunityIcons name="swap-horizontal-bold" size={24} color={color} />,
                    Budget: <Fontisto name="pie-chart-2" size={24} color={color} />,
                    Profile: <Ionicons name="person" size={24} color={color} />,
                };

                const labels = {
                    Home: 'Home',
                    Transaction: 'Transaction',
                    Budget: 'Budget',
                    Profile: 'Profile',
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        className={`flex-1 items-center ${index === 2 ? 'mr-8' : ''} ${index === 3 ? 'ml-8' : ''}`}
                        onPress={onPress}
                    >
                        {icons[route.name]}
                        <Text className={`text-xs ${labelColor}`}>{labels[route.name]}</Text>
                    </TouchableOpacity>
                );
            })}

            <View className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <TouchableOpacity className="items-center bg-purple-200 p-3 rounded-full">
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomTabBar;
