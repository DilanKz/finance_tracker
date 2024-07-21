import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or any other icon library you prefer
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NavigationBar() {

    const navigation = useNavigation();

    return (
        <View className="flex-row items-center justify-around bg-white py-3 shadow-md">
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigation.navigate('Home')}>
                <FontAwesome6 name="house-chimney" size={24} color="#8a2be2" />
                <Text className="text-xs text-purple-600">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigation.navigate('Transaction')}>
                <MaterialCommunityIcons name="swap-horizontal-bold" size={24} color="gray" />
                <Text className="text-xs text-gray-500">Transaction</Text>
            </TouchableOpacity>
            <View className="flex-none items-center">
                <TouchableOpacity className="items-center bg-purple-200 p-3 rounded-full">
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigation.navigate('Budget')}>
                <Fontisto name="pie-chart-2" size={24} color="gray" />
                <Text className="text-xs text-gray-500">Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={24} color="gray" />
                <Text className="text-xs text-gray-500">Profile</Text>
            </TouchableOpacity>
        </View>
    )
}
