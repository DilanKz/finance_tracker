import {Text, TouchableOpacity, View} from "react-native";
import TransactionCard from "../transactions/transactionCard";

const arr = ['Shopping', 'Food', 'Travel', 'Health']

const Recent = (props) => {

    return (
        <View classNam={'flex-1'}>
            <View className={'flex-row justify-between'}>
                <Text className={'font-semibold text-lg'}>Recent Transactions</Text>
                <TouchableOpacity className={'rounded-2xl bg-violet-200 px-3 py-1'} onPress={props.navigate}>
                    <Text className={'text-customPurple'}>See All</Text>
                </TouchableOpacity>
            </View>

            {arr.map((name,index) => (
                <TransactionCard key={index} title={name} />
            ))}
        </View>
    )
}

export default Recent
