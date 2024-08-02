import {Text, TouchableOpacity, View} from "react-native";
import TransactionCard from "../transactions/transactionCard";
import {useEffect, useState} from "react";
import TransactionController from "../../db/controllers/TransactionController";

const arr = ['Shopping', 'Food', 'Travel', 'Health']

const Recent = ({navigate, allTransactions}) => {

    return (
        <View classNam={'flex-1'}>
            <View className={'flex-row justify-between'}>
                <Text className={'font-semibold text-lg'}>Recent Transactions</Text>
                <TouchableOpacity className={'rounded-2xl bg-violet-200 px-3 py-1'} onPress={navigate}>
                    <Text className={'text-customPurple'}>See All</Text>
                </TouchableOpacity>
            </View>

            {allTransactions?.map((item,index) => {
                return (
                    <TransactionCard key={index} item={item} />
                )
            })}

            {allTransactions?.length === 0 ?
                <Text className={'text-gray-500 text-center mt-12'}>Wow its empty</Text>
                : ''}
        </View>
    )
}

export default Recent
