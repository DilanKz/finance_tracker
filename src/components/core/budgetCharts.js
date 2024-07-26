import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Sample data
const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            data: [200, 450, 300, 700, 500, 400, 600],
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            strokeWidth: 2,
        },
    ],
};

const pieData = [
    { name: 'Food', population: 215, color: '#f00', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Transport', population: 150, color: '#0f0', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Entertainment', population: 100, color: '#00f', legendFontColor: '#000', legendFontSize: 15 },
];

const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            data: [50, 200, 300, 400, 500],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
};

const BudgetCharts = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        {/* Line Chart */}
        <LineChart
            data={lineData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ marginBottom: 20 }}
        />

        {/* Pie Chart */}
        <PieChart
            data={pieData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
        />

        {/* Bar Chart */}
        <BarChart
            data={barData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            style={{ marginVertical: 8, borderRadius: 16 }}
        />
    </View>
);

export default BudgetCharts;
