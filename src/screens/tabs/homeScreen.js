import React, {useContext} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import MinimalBezierLineChart from "../../components/core/minimalChart";
import {AntDesign, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {RouteContext} from "../../components/context/routeProvider";
import {useNavigation} from "@react-navigation/native";
import Recent from "../../components/home/recent";

const HomeScreen = () => {

    const navigation = useNavigation();

    const { route, setRoute } = useContext(RouteContext);

    const navigator = (value) => {
        navigation.navigate(value)
        setRoute(value)
    }

    return (
        <ScrollView className="flex-1 p-4 bg-white">

            <View className={'mt-12 w-full py-1 px-1 flex flex-row justify-between items-center'}>
                <View className={'border p-1 rounded-full'}>
                    <TouchableOpacity className={'flex items-center justify-center'} onPress={()=>navigator('Profile')}>
                        <Image
                            source={require('../../assets/favicon.png')}
                            className={'w-10 h-10 rounded-full'}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className={'flex items-center justify-center relative'}>
                    <FontAwesome name="bell" size={24} color="#7F39FB" />
                </TouchableOpacity>
            </View>

            <View className={'mt-4'}>
                <Text className={'text-center font-semibold text-gray-400 mb-2'}>Account Balance</Text>
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

            <View className={'mt-8 mb-4'}>
                <Recent navigate={()=>navigator('Transaction')} />
            </View>

        </ScrollView>
    );
};

export default HomeScreen;
