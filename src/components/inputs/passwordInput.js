import {TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

export default function PasswordInput({value, onChange, placeHolder='Password'}) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={'w-full border border-gray-300 rounded-md pl-4 mb-4 flex flex-row justify-between items-center pr-2'}>
            <TextInput
                className={'w-10/12 text-xl py-2'}
                onChangeText={onChange}
                value={value}
                placeholder={placeHolder}
                secureTextEntry={!showPassword}
            />

            {showPassword ?
                <TouchableOpacity onPress={() =>setShowPassword(false)}>
                    <Ionicons name="eye-off-outline" size={24} color={'#878791'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() =>setShowPassword(true)}>
                    <Ionicons name="eye-outline" size={24} color={'#878791'} />
                </TouchableOpacity>
            }
        </View>
    )
}
