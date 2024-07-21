import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TransactionDetailCard from "../../components/transactions/transactionDetailCard";

const options = [
    { label: 'Day', value: 'Day' },
    { label: 'Week', value: 'Week' },
    { label: 'Month', value: 'Month' },
    { label: 'Year', value: 'Year' },
];

const TransactionScreen = () => {
    const [selectedValue, setSelectedValue] = useState('Month');

    return (
        <View className="flex-1 px-4 bg-white">
            <View className="mt-16 w-full py-2 flex flex-row justify-between items-center">
                <View className="border border-gray-200 rounded-full bg-white px-2 py-1">
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

                <TouchableOpacity className="bg-white border border-gray-200 rounded-md px-2 py-1">
                    <MaterialIcons name="filter-list" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity className={'bg-violet-200 p-3 rounded-md my-3 flex-row justify-between items-center'}>
                <Text className={'text-violet-700'}>See your financial report</Text>
                <FontAwesome5 name="chevron-right" size={18} color={'rgb(109 40 217)'} />
            </TouchableOpacity>

            <ScrollView className="flex-1">
                <View className="">
                    <TransactionDetailCard
                        title={'Today'}
                        filter={'today'}
                    />
                    <TransactionDetailCard
                        title={'Yesterday'}
                        filter={'yesterday'}
                    />
                    <TransactionDetailCard
                        title={'This Month'}
                        filter={'month'}
                    />
                </View>
            </ScrollView>


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
