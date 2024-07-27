import React, {useState, useContext, useRef, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import {
    AntDesign,
    FontAwesome,
    FontAwesome6,
    Fontisto,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouteContext } from "../context/routeProvider";

export default function NavigationBar() {
    const navigation = useNavigation();
    const { route, setRoute } = useContext(RouteContext);

    const [showExtraButtons, setShowExtraButtons] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const getColor = (screenName) => {
        return route === screenName ? '#8a2be2' : 'gray';
    };

    const getLabelColor = (screenName) => {
        return route === screenName ? 'text-purple-600' : 'text-gray-500';
    };

    const navigator = (value) => {
        navigation.navigate(value);
        setRoute(value);
    };

    const toggleExtraButtons = () => {
        setShowExtraButtons(!showExtraButtons);
        Animated.timing(rotation, {
            toValue: showExtraButtons ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (showExtraButtons) {
            setShowExtraButtons(false);
            Animated.timing(rotation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [route]);

    const rotationInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotationInterpolate }],
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

            <View className="flex-none items-center" style={styles.centerButtonContainer}>
                <TouchableOpacity className="items-center bg-customPurple p-3 rounded-full" onPress={toggleExtraButtons}>
                    <Animated.View style={animatedStyle}>
                        <AntDesign name="plus" size={24} color="white" />
                    </Animated.View>
                </TouchableOpacity>
                {showExtraButtons && (
                    <>
                        <TouchableOpacity className="flex justify-center items-center bg-emerald-500 h-12 w-12 rounded-full" style={styles.extraButton1} onPress={() => console.log('Extra Button 1 pressed')}>
                            <MaterialIcons name="arrow-downward" size={12} color={'#fff'}/>
                            <FontAwesome name="money" size={20} color={'#fff'}/>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex justify-center items-center bg-rose-500 h-12 w-12 rounded-full" style={styles.extraButton2} onPress={() => console.log('Extra Button 2 pressed')}>
                            <MaterialIcons name="arrow-upward" size={12} color={'#fff'}/>
                            <FontAwesome name="money" size={20} color={'#fff'}/>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <TouchableOpacity className="flex-1 items-center" onPress={() => navigator('Budget')}>
                <Fontisto name="pie-chart-2" size={24} color={getColor('Budget')} />
                <Text className={`text-xs ${getLabelColor('Budget')}`}>Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center" onPress={() => navigator('Settings')}>
                <Ionicons name="settings" size={24} color={getColor('Settings')} />
                <Text className={`text-xs ${getLabelColor('Settings')}`}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centerButtonContainer: {
        position: 'relative',
    },
    extraButton1: {
        position: 'absolute',
        bottom: 70,
        right: 40,
    },
    extraButton2: {
        position: 'absolute',
        bottom: 70,
        right: -40,
    },
});
