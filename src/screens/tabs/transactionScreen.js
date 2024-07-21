import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const options = [
    { label: 'Day', value: 'Day' },
    { label: 'Week', value: 'Week' },
    { label: 'Month', value: 'Month' },
    { label: 'Year', value: 'Year' },
];

const TransactionScreen = () => {
    const [selectedValue, setSelectedValue] = useState('Month');

    return (
        <View className="flex-1">
            <View className="mt-16 w-full py-2 px-4 flex flex-row justify-between items-center">
                <View className="border border-gray-300 rounded-full bg-white px-2 py-1">
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={options}
                        value={selectedValue}
                        style={{
                            inputIOS: styles.inputIOS,
                            inputAndroid: styles.inputAndroid,
                            iconContainer: styles.iconContainer,
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => (
                            <FontAwesome5 name="chevron-down" size={12} color="#8a2be2" />
                        )}
                    />
                </View>

                <TouchableOpacity className="bg-white border border-gray-300 rounded-md px-2 py-1">
                    <MaterialIcons name="filter-list" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-gray-950 justify-center items-center">
                <Text className="text-center text-lg text-gray-800">Your Text Here</Text>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({

    inputIOS: {
        height: 20,
        width: 100,
        paddingHorizontal: 10,
        color: 'black',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    inputAndroid: {
        height: 40,
        width: 100,
        paddingHorizontal: 10,
        color: 'black',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    iconContainer: {
        top: Platform.OS === 'ios' ? 10 : 15,
        right: 10,
    },
});

export default TransactionScreen;
