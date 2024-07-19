import React from "react";
import {View, Image, Text, Dimensions} from "react-native";
import Carousel from 'react-native-reanimated-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const data = [
    {
        image: require('../../assets/Illustration1.png'),
        title: 'Planning ahead',
        description: 'Become your own money manager and make every cent count',
    },
    {
        image: require('../../assets/Illustration2.png'),
        title: 'Gain total control of your money',
        description: 'Setup your budget for each category so you in control',
    },
    {
        image: require('../../assets/Illustration3.png'),
        title: 'Know where your money goes',
        description: 'Track your transaction easily,with categories and financial report ',
    },
]

export function CustomCarousel() {

    const renderItem = ({ item }) => (
        <View className="w-full h-full flex items-center justify-center px-4">
            <Image source={item.image} className="mb-2 mt-6" />
            <Text className="text-4xl font-bold mb-4 text-center">
                {item.title}
            </Text>
            <Text className="text-base text-center text-gray-500">
                {item.description}
            </Text>
        </View>
    );

    return (
        <View className="w-full h-full flex items-center justify-center">
            <Carousel
                width={viewportWidth}
                data={data}
                renderItem={renderItem}
                scrollAnimationDuration={1000}
                autoPlay={true}
                autoPlayInterval={3000}
            />
        </View>
    )
}
