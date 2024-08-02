import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MinimalBezierLineChart from "../../components/core/minimalChart";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {RouteContext} from "../../components/context/routeProvider";
import {useNavigation} from "@react-navigation/native";
import Recent from "../../components/home/recent";
import TransactionController from "../../db/controllers/TransactionController";
import {UserContext} from "../../components/context/userProvider";
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {

    const navigation = useNavigation();

    const {route, setRoute} = useContext(RouteContext);
    const { user, setUser } =useContext(UserContext)

    const [allTransactions, setAllTransactions] = useState([]);
    const [dataArr, setDataArr] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadAllTransactions = async () => {
        await TransactionController.loadRecentTransactions().then(res => {
            setAllTransactions(res.data)
        })
    }

    const loadDataArray = async () => {
        await TransactionController.loadTransactionAmounts().then(res => {
            if (res.success) {
                setDataArr(res.data)
            }
        })
    }

    useEffect(() => {
        setLoading(true);
        loadDataArray()
        loadAllTransactions()
        setLoading(false);
    }, [user]);

    const navigator = (value) => {
        navigation.navigate(value)
        setRoute(value)
    }

    return (
        <ScrollView className="flex-1 p-4 bg-white">

            <View className={'mt-12 w-full py-1 px-1 flex flex-row justify-end items-center'}>
                <TouchableOpacity className={'flex items-center justify-center relative'}>
                    <FontAwesome name="bell" size={24} color="#7F39FB"/>
                </TouchableOpacity>
            </View>

            <View className={'mt-4'}>
                <Text className={'text-center font-semibold text-gray-400 mb-2'}>Current Budget</Text>
                <Text className={'text-center font-bold text-4xl mb-4'}>LKR {user?.budget || 0}</Text>

                <View className={'flex-row justify-center gap-x-3'}>
                    <View className={'bg-emerald-500 flex-row items-center px-2 py-2 rounded-2xl'}>

                        <View className={'flex-col items-center bg-white rounded-2xl px-3'}>
                            <MaterialIcons name="arrow-downward" size={20} color={'rgb(16, 185, 129)'}/>
                            <FontAwesome name="money" size={32} color={'rgb(16, 185, 129)'}/>
                        </View>

                        <View className={'ml-4'}>
                            <Text className={'text-white font-semibold '}>Income</Text>
                            <Text className={'text-white font-semibold text-xl'}>LKR {user?.income || 0}</Text>
                        </View>
                    </View>
                    <View className={'bg-red-700 flex-row items-center px-2 py-2 rounded-2xl'}>

                        <View className={'flex-col items-center bg-white rounded-2xl px-3'}>
                            <MaterialIcons name="arrow-upward" size={20} color={'rgb(185, 28, 28)'}/>
                            <FontAwesome name="money" size={32} color={'rgb(185, 28, 28)'}/>
                        </View>

                        <View className={'ml-4'}>
                            <Text className={'text-white font-semibold '}>Expenses</Text>
                            <Text className={'text-white font-semibold text-xl'}>LKR {user?.expense || 0}</Text>
                        </View>
                    </View>
                </View>

            </View>

            <Text className={'text-lg font-semibold mt-8'}>Spend Frequency</Text>
            {dataArr.length > 0 ?
                <MinimalBezierLineChart data={dataArr} /> :
                <View className={'flex-row justify-center items-center min-h-[100px]'}>
                    <Text className={'text-center'}>wow it's empty</Text>
                </View>
            }

            <View className={'mt-8 mb-4'}>
                <Recent allTransactions={allTransactions} navigate={() => navigator('Transaction')}/>
            </View>

            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

        </ScrollView>
    );
};

export default HomeScreen;
