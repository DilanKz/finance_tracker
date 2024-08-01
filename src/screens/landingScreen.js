// ** React Imports
import React, {useEffect} from "react";

// Expo Imports
import {StatusBar} from "expo-status-bar";

// ** React Native Imports
import {Image, View} from "react-native";
import UserController from "../db/controllers/UserController";
import DatabaseService from "../db/services/DatabaseService";

export default function LandingScreen({navigation}) {

    useEffect(() => {
        const initializeStorage = async () => {


            /*let timeout = setTimeout(() => {
                navigation.navigate('onBoard')
            }, 2000);

            return () => clearTimeout(timeout)*/

            await DatabaseService.initializeDatabase();

            UserController.isStorageInitialized().then(res => {
                console.log(res)
                if (res.success) {
                    navigation.navigate('main');
                } else {
                    navigation.navigate('onBoard');
                }
            });
            /*if (isInitialized) {
                navigation.navigate('main');
            } else {
                navigation.navigate('onBoard');
            }*/
        };

        initializeStorage();
    }, []);

    return (
        <View className="w-screen flex flex-1 items-center justify-center bg-customPurple">
            <StatusBar backgroundColor={"#7F3DFF"}/>
            <Image source={require('../assets/coinzen.png')} className={'w-10/12 h-40'}/>
        </View>
    );
}
