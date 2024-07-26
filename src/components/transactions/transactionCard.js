import {Text, View} from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import {getCategoryByTitle} from "../../utils/constants";
const TransactionCard = (props) => {

    const shoppingCategory = getCategoryByTitle(props.title);

    return (
        <View className="w-full my-4 flex-row px-4 ">
            <View className={`${shoppingCategory.color} w-20 h-20 rounded-2xl flex-row justify-center items-center`}>
                {shoppingCategory.icon}
            </View>
            <View className="flex-1 ml-1 h-20 rounded-2xl flex-col justify-between">
                <View className={'w-full flex-row justify-between pr-4 pt-1'}>
                    <Text className={'text-xl font-semibold'}>{shoppingCategory.title}</Text>
                    <Text className={`text-xl font-bold ${shoppingCategory.category === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {shoppingCategory.category === 'income' ? '+' : '-'}$100
                    </Text>
                </View>

                <View className={'w-full flex-row justify-between pr-4 pb-2'}>
                    <Text className={'text-gray-500 font-semibold'}>Desc</Text>
                    <Text className={'text-gray-500 font-semibold'}>03:33 AM</Text>
                </View>
            </View>
        </View>
    )
}

export default TransactionCard

const obj = {
    title:'Shopping',
    icon:<FontAwesome6 name="basket-shopping" size={42} color="#FCAC12" />,
    color:'bg-amber-200',
    category:'expense'
}