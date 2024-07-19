// ** React Imports
import React, {useState} from "react";

// ** Native Wind Custom Imports
import {StyledView} from "../utils/StyledComponents";

// ** Native Imports
import {StatusBar, Text, TouchableOpacity} from "react-native";
import Login from "../components/boarding/login";
import Register from "../components/boarding/register";

export default function OnboardScreen({navigation}) {

    const [screen, setScreen] = useState('boarding');

    return (
        <StyledView className="w-screen flex flex-1">
            {screen === 'boarding' ?
                <>
                    <StatusBar backgroundColor={"#ffffff"}/>
                    <StyledView className={'w-screen h-2/3'}></StyledView>
                    <StyledView className={'w-screen h-1/3 p-2 pt-4 px-4'}>
                        <TouchableOpacity className={'w-full flex items-center py-4 bg-customPurple rounded-xl mb-4'}
                                          onPress={()=>setScreen('register')}
                        >
                            <Text className={'text-xl text-gray-100'}>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={'w-full flex items-center py-4 bg-customPurpleLight rounded-xl mb-2'}
                                          onPress={()=>setScreen('login')}
                        >
                            <Text className={'text-xl text-customPurple'}>Login</Text>
                        </TouchableOpacity>
                    </StyledView>
                </>
                : screen === 'login' ? <Login setScreen={setScreen} /> :
                    screen === 'register' ? <Register setScreen={setScreen} /> :''
            }
        </StyledView>
    );
}