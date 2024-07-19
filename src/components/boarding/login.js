// ** React Import
import React, {useState} from "react";

// ** React Native Imports
import {Text, TextInput, TouchableOpacity, View} from "react-native";

// ** Expo Icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PasswordInput from "../inputs/passwordInput";

export default function Login({setScreen}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className={'w-screen'}>
            <View className={'mt-16 w-full py-2 px-4 flex flex-row justify-between text-center'}>
                <TouchableOpacity onPress={() => setScreen('boarding')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text className={'text-xl font-bold text-black'}>Login</Text>
                <Text className={'text-xl text-black'}></Text>
            </View>

            <View className={'w-screen py-2 px-3'}>
                <View className={'w-full border border-gray-400 rounded-md pl-4 mb-4'}>
                    <TextInput
                        className={'w-full text-xl py-2'}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                    />
                </View>
                <PasswordInput value={password} onChange={setPassword} />

                <TouchableOpacity className={'w-full flex items-center py-4 bg-customPurple rounded-xl mb-4'}>
                    <Text className={'text-xl text-gray-100'}>Login</Text>
                </TouchableOpacity>

                <View className="flex justify-center items-center flex-row mt-2">
                    <Text className="text-md">
                        Don't have an account yet?
                    </Text>
                    <TouchableOpacity className="pl-2" onPress={() => setScreen('register')}>
                        <Text className="underline text-customPurple">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
