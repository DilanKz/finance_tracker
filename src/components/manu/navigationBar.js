import React, {useState} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or any other icon library you prefer
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

export default function NavigationBar() {

    const navigation = useNavigation();

    const [route, setRoute] = useState('Home');

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
            <View className="flex-none items-center">
                <TouchableOpacity className="items-center bg-purple-200 p-3 rounded-full">
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
