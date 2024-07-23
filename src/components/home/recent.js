import {Text, TouchableOpacity, View} from "react-native";
import TransactionCard from "../transactions/transactionCard";

const Recent = (props) => {

    return (
        <View classNam={'flex-1'}>
            <View className={'flex-row justify-between'}>
                <Text className={'font-semibold text-lg'}>Recent Transactions</Text>
                <TouchableOpacity className={'rounded-2xl bg-violet-200 px-3 py-1'} onPress={props.navigate}>
                    <Text className={'text-customPurple'}>See All</Text>
                </TouchableOpacity>
            </View>

            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
        </View>
    )
}

export default Recent
