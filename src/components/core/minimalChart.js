import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import TransactionController from "../../db/controllers/TransactionController";

const { width } = Dimensions.get('window');

const data = {
    labels: [],
    datasets: [
        {
            data: [0,0,0,0,0,0,0,0],
            color: (opacity = 1) => `rgba(127, 61, 255, 0.7)`,
            strokeWidth: 5,
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(127, 61, 255, 0.7)`,
    strokeWidth: 10,
    useShadowColorFromDataset: false,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    fillShadowGradientFrom: `rgba(127, 61, 255, 0.1)`,
    fillShadowGradientTo:'#fff',

};

const MinimalBezierLineChart = (props) => {

    const [filer, setFiler] = useState('today');

    const setFilterValue = (value) => {
        setFiler(value)
    }


    useEffect(() => {

        props.data.length > 0 ? data.datasets[0].data=props.data : data.datasets[0].data=[0,0,0,0,0,0]

        console.log('data : ', props.data)
    }, []);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
            <LineChart
                data={data}
                withVerticalLines={false}
                withHorizontalLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                withDots={false}
                width={width + 150}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    backgroundColor: 'white',
                    marginLeft: -10,
                    marginRight: -10,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom:0,
                    marginBottom:0
                }}
            />
            {/*<View className={'w-full flex-row flex-1 -mt-8 justify-evenly'}>
                <TouchableOpacity className={`${filer === 'today' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('today')}>
                    <Text className={`${filer === 'today' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${filer === 'week' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('week')}>
                    <Text className={`${filer === 'week' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>Weak</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${filer === 'month' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('month')}>
                    <Text className={`${filer === 'month' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${filer === 'year' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('year')}>
                    <Text className={`${filer === 'year' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>Year</Text>
                </TouchableOpacity>
            </View>*/}
        </View>
    );
}

export default MinimalBezierLineChart;
