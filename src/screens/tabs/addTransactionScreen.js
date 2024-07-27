import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {AntDesign, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

const dateOptions = [
    {label: 'Shopping', value: 'Shopping'},
    {label: 'Health', value: 'Health'},
    {label: 'Travel', value: 'Travel'},
    {label: 'Entertainment', value: 'Entertainment'},
    {label: 'Others', value: 'Others'},
];

const AddTransactionScreen = ({ route }) => {

    const navigation = useNavigation()
    const { type } = route.params;

    const backgroundColor = type === 'income' ? 'bg-emerald-500' : 'bg-rose-500';

    const [amount, setAmount] = useState('0');
    const [selectedValue, setSelectedValue] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        setIsActive(!isActive);
    };

    const handleTextChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');

        setAmount(numericValue);
    };

    return (
        <View className={`flex-1 ${backgroundColor}`}>

            <View className={'mt-16 w-full py-2 px-4 flex flex-row text-center'}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('main')}
                    className="absolute left-4 top-0 bottom-0 flex items-center justify-center z-10"
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white flex-1 text-center">{type === 'income' ? 'Add Income' : 'Add Expense'}</Text>
            </View>

            <View className={'pl-8 pt-4 pb-2 mt-56 mb-8'}>
                <Text className={'font-semibold text-white opacity-50 text-xl'}>How much ?</Text>
                <View className={'flex-row items-center gap-x-3'}>
                    <Text className={'font-semibold text-white text-5xl'}>LKR</Text>
                    <TextInput
                        className={'w-full text-white text-5xl font-semibold'}
                        placeholderTextColor={'#FFFFFF'}
                        keyboardType={'numeric'}
                        value={amount}
                        onChangeText={handleTextChange}
                        textAlignVertical={'center'}
                        style={{
                            textAlign: 'left',
                            paddingVertical: 0
                        }}
                    />
                </View>
            </View>

            <View className={'bg-white flex-1 rounded-t-3xl pt-8 px-4'}>

                <View className={'border border-gray-200 rounded-3xl px-2'}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={dateOptions}
                        value={selectedValue}
                        style={{
                            inputIOS: styles.inputIOS,
                            inputAndroid: styles.inputAndroid,
                            iconContainer: styles.iconContainer,
                        }}
                    />
                </View>

                <View className={'border border-gray-200 rounded-3xl mt-8 px-2'}>
                    <TextInput
                        className={'py-3 px-4'}
                        placeholder={'Description'}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
                <View className="flex-1 flex-row justify-between items-center px-2">

                    <View>
                        <Text className={'font-semibold text-lg'}>Repeat</Text>
                        <Text>repeat transaction</Text>
                    </View>

                    <TouchableOpacity
                        className={``}
                        onPress={toggleButton}
                    >
                        <MaterialIcons
                            name={isActive ? 'toggle-on' : 'toggle-off'}
                            size={50}
                            color={isActive ? 'rgb(127 61 255)' : 'lightgray'}
                        />
                    </TouchableOpacity>
                </View>
                <View className={'mt-4 mb-4 px-2'}>
                    <TouchableOpacity className={'bg-customPurple rounded-xl'}>
                        <Text className={'text-white text-lg text-center py-3'}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});

export default AddTransactionScreen;
