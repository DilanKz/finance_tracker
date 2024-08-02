import { Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import {getCategoryByTitle} from "../../utils/constants";
import {UserContext} from "../context/userProvider";
import {useContext} from "react";

export const BudgetProgressCard = ({category, title, data}) => {
    const { user, setUser } =useContext(UserContext);

    return (
        <View className={'p-1 mb-2'}>
            <View style={{
                backgroundColor: 'white',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                padding:8,
            }}>
                <View className='flex-row justify-between items-start mb-2'>
                    <View className='flex-row items-start'>
                        <View className={`${category.color} p-2 rounded-lg flex-row items-center justify-center mr-2`}>
                            {category.iconSmall}
                        </View>
                        <Text className='text-gray-500 uppercase font-semibold'>{category.title}</Text>
                    </View>
                    {/*<Text className='text-lg'>-</Text>*/}
                </View>

                <Text className='font-semibold mb-2'>
                    Used : {data.totalAmount}
                </Text>

                <Progress.Bar
                    progress={data.totalAmount / user.budget}
                    width={null}
                    color={category.colorHex}
                    borderRadius={10}
                    height={8}
                />
            </View>
        </View>
    );
}
