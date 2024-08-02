// ** React Imports
import React, {useContext, useEffect} from "react";

// Expo Imports
import {StatusBar} from "expo-status-bar";

// ** React Native Imports
import {Image, View} from "react-native";
import UserController from "../db/controllers/UserController";
import DatabaseService from "../db/services/DatabaseService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext} from "../components/context/userProvider";

export default function LandingScreen({navigation}) {

    const { user, setUser } =useContext(UserContext)

    useEffect(() => {
        const initializeStorage = async () => {


            /*let timeout = setTimeout(() => {
                navigation.navigate('onBoard')
            }, 2000);

            return () => clearTimeout(timeout)*/

            await DatabaseService.initializeDatabase();

            UserController.isStorageInitialized().then(async res => {
                if (res.success) {
                    setUser(res.data)
                    // await AsyncStorage.setItem('userData', JSON.stringify(res.data));
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
