// ** React Import
import React, {useState} from "react";

// ** React Native Imports
import {Text, TextInput, TouchableOpacity, View} from "react-native";

// ** Expo Icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PasswordInput from "../inputs/passwordInput";
import { TailwindProvider } from 'nativewind';
export default function Register({setScreen}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className={'w-screen'}>

            <View className={'mt-16 w-full py-2 px-4 flex flex-row justify-between text-center'}>
                <TouchableOpacity onPress={() => setScreen('boarding')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text className={'text-xl font-bold text-black'}>Sign Up</Text>
                <Text className={'text-xl text-black'}></Text>
            </View>

            <View className={'w-screen py-2 px-3'}>
                <View className={'w-full border border-gray-300 rounded-md pl-4 mb-4'}>
                    <TextInput
                        className={'w-full text-xl py-2'}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                    />
                </View>
                <View className={'w-full border border-gray-300 rounded-md pl-4 mb-4'}>
                    <TextInput
                        className={'w-full text-xl py-2'}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                    />
                </View>
                <PasswordInput value={password} onChange={setPassword} />

                <TouchableOpacity className={'w-full flex items-center py-4 bg-customPurple rounded-xl mb-4'}>
                    <Text className={'text-xl text-gray-100'}>Login</Text>
                </TouchableOpacity>

                <View className="flex justify-center items-center flex-row mt-2">
                    <Text className="text-md">
                        Already have an account?
                    </Text>
                    <TouchableOpacity className="pl-2" onPress={() => setScreen('login')}>
                        <Text className="underline text-customPurple">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
