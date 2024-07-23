import React, {useState} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const data = {
    labels: [],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43, 50],
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

const MinimalBezierLineChart = () => {

    const [filer, setFiler] = useState('today');

    const setFilterValue = (value) => {
        setFiler(value)
    }

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
            <View className={'w-full flex-row flex-1 -mt-8 justify-evenly'}>
                <TouchableOpacity className={`${filer === 'today' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('today')}>
                    <Text className={`${filer === 'today' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${filer === 'week' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('week')}>
                    <Text className={`${filer === 'week' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>weak</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${filer === 'month' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('month')}>
                    <Text className={`${filer === 'month' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>month</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${filer === 'year' ? 'bg-amber-100' : ''} rounded-xl px-3 `} onPress={()=>setFilterValue('year')}>
                    <Text className={`${filer === 'year' ? 'text-amber-500' : 'text-gray-400'} font-semibold text-lg`}>year</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MinimalBezierLineChart;
