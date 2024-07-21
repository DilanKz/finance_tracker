import {Text, View} from "react-native";
import TransactionCard from "./transactionCard";

const TransactionDetailCard = (props) => {
    return (
        <View className={'w-full'}>
            <Text className="text-2xl text-gray-800 font-semibold">{props.title}</Text>
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
        </View>
    )
}

export default TransactionDetailCard
