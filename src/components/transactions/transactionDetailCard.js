import {Text, View} from "react-native";
import TransactionCard from "./transactionCard";

const arr = ['Shopping', 'Food', 'Travel', 'Health']

const TransactionDetailCard = (props) => {
    return (
        <View className={'w-full'}>
            <Text className="text-2xl text-gray-800 font-semibold">{props.title}</Text>
            {arr.map((name,index) => (
                <TransactionCard key={index} title={name} />
            ))}
        </View>
    )
}

export default TransactionDetailCard
