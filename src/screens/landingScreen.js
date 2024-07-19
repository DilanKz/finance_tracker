// ** React Imports
import React, {useEffect} from "react";

// Expo Imports
import {StatusBar} from "expo-status-bar";

// ** React Native Imports
import {Image, View} from "react-native";

export default function LandingScreen({navigation}) {

    useEffect(() => {
        let timeout = setTimeout(() => {
            navigation.navigate('onBoard')
        }, 2000);

        return () => clearTimeout(timeout)
    }, []);

    return (
        <View className="w-screen flex flex-1 items-center justify-center bg-customPurple">
            <StatusBar backgroundColor={"#7F3DFF"}/>
            <Image source={require('../assets/coinzen.png')} className={'w-10/12 h-40'}/>
        </View>
    );
}
