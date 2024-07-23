import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import MinimalBezierLineChart from "../../components/core/minimalChart";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";

const HomeScreen = () => {
    return (
        <ScrollView className="flex-1 p-4 bg-white">

            <View className={'pt-16'}>
                <Text className={'text-center font-semibold text-gray-400'}>Account Balance</Text>
                <Text className={'text-center font-bold text-4xl mb-4'}>RS 12000</Text>

                <View className={'flex-row justify-center gap-x-3'}>
                    <View className={'bg-emerald-500 flex-row items-center px-2 py-2 rounded-2xl'}>

                        <View className={'flex-col items-center bg-white rounded-2xl px-3'}>
                            <MaterialIcons name="arrow-downward" size={20} color={'rgb(16, 185, 129)'}/>
                            <FontAwesome name="money" size={32} color={'rgb(16, 185, 129)'}/>
                        </View>

                        <View className={'ml-4'}>
                            <Text className={'text-white font-semibold '}>Income</Text>
                            <Text className={'text-white font-semibold text-xl'}>RS 35000</Text>
                        </View>
                    </View>
                    <View className={'bg-red-700 flex-row items-center px-2 py-2 rounded-2xl'}>

                        <View className={'flex-col items-center bg-white rounded-2xl px-3'}>
                            <MaterialIcons name="arrow-upward" size={20} color={'rgb(185, 28, 28)'}/>
                            <FontAwesome name="money" size={32} color={'rgb(185, 28, 28)'}/>
                        </View>

                        <View className={'ml-4'}>
                            <Text className={'text-white font-semibold '}>Expenses</Text>
                            <Text className={'text-white font-semibold text-xl'}>RS 23000</Text>
                        </View>
                    </View>
                </View>

            </View>

            <Text className={'text-lg font-semibold mt-8'}>Spend Frequency</Text>
            <MinimalBezierLineChart/>
        </ScrollView>
    );
};

export default HomeScreen;
