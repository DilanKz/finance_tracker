import React, { useRef, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import BudgetCharts from "../../components/core/budgetCharts";
import { BudgetProgressCard } from "../../components/budget/budgetProgressCard";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { OffCanvasModel } from "../../components/core/offcanvasModel";

const arr = ['Shopping', 'Food', 'Travel', 'Others'];

const BudgetScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editBudget, setEditBudget] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;


    const opacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View className="flex-1 bg-customPurple">

            <Animated.View style={[{ opacity }, { position: 'absolute', top: 0, left: 0, right: 0, padding: 16, zIndex: 10 }]}>
                <View className="flex-row justify-end mb-4 pt-12">
                    <TouchableOpacity onPress={() => setEditBudget(true)}>
                        <MaterialIcons name="edit" size={24} color="white"/>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center pt-4">
                    <Text className="text-lg font-semibold text-white text-center">Current Budget</Text>
                    <Text className="text-6xl font-bold text-white text-center">LKR 4500</Text>

                    <View className={'flex-row justify-between'}>
                        <Text className="text-lg font-semibold text-white mt-4">Used</Text>
                        <Text className="text-lg font-semibold text-white mt-4">LKR 2000</Text>
                    </View>
                    <View className={'flex-row justify-between'}>
                        <Text className="text-lg font-semibold text-white">Remaining</Text>
                        <Text className="text-lg font-semibold text-white">LKR 2500</Text>
                    </View>
                </View>
            </Animated.View>

            <ScrollView
                contentContainerStyle={{ paddingTop: 200 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View className="my-24"></View>
                <View className="flex-1 p-4 bg-white rounded-t-3xl -mt-20 z-20">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-lg font-semibold mb-2">Budget Categories</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            className="bg-customPurple p-2 rounded-md flex-row items-center"
                        >
                            <FontAwesome6 name="plus" size={12} color="white"/>
                        </TouchableOpacity>
                    </View>

                    {arr.map((name, index) => (
                        <TouchableWithoutFeedback key={index} onLongPress={() => setModalVisible(true)}>
                            <View>
                                <BudgetProgressCard title={name}/>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}

                    <BudgetCharts/>

                    {modalVisible && (
                        <OffCanvasModel modalVisible={modalVisible} setModalVisible={setModalVisible} height={150}>
                            <View className="mb-16">
                                <Text className={'text-lg font-semibold'}>Add new category</Text>
                            </View>
                        </OffCanvasModel>
                    )}

                    {editBudget && (
                        <OffCanvasModel modalVisible={editBudget} setModalVisible={setEditBudget} height={250}>
                            <View className="mb-16">
                                <Text className={'text-lg font-semibold'}>Edit Your Budget</Text>
                            </View>
                        </OffCanvasModel>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default BudgetScreen;
