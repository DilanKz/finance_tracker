import React, {useRef, useState} from 'react';
import {Animated, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import BudgetCharts from "../../components/core/budgetCharts";
import {BudgetProgressCard} from "../../components/budget/budgetProgressCard";
import {FontAwesome6, MaterialIcons} from "@expo/vector-icons";
import {OffCanvasModel} from "../../components/core/offcanvasModel";
import categories from "../../utils/constants";
import ManageBudgetModal from "../../components/core/manageBudgetModal";

const arr = ['Shopping', 'Food', 'Travel', 'Others'];

const BudgetScreen = () => {
    const [manageCategory, setManageCategory] = useState(false);
    const [editBudget, setEditBudget] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const scrollY = useRef(new Animated.Value(0)).current;

    const handlePress = (category) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    const opacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const zIndex = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 10],
        extrapolate: 'clamp',
    });

    return (
        <View className="flex-1 bg-customPurple">
            <Animated.View style={{flex: 1}}>
                <Animated.View
                    style={[{opacity}, {position: 'absolute', top: 0, left: 0, right: 0, padding: 16, zIndex: 10}]}>
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

                <Animated.ScrollView
                    contentContainerStyle={{paddingTop: 200}}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: false}
                    )}
                    style={{zIndex}}
                >
                    <View className="my-24"></View>
                    <View className="flex-1 p-4 bg-white rounded-t-3xl -mt-20 z-20">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-lg font-semibold mb-2">Budget Categories</Text>
                            <TouchableOpacity
                                onPress={() => setManageCategory(true)}
                                className="bg-customPurple p-2 rounded-md flex-row items-center"
                            >
                                <FontAwesome6 name="plus" size={12} color="white"/>
                            </TouchableOpacity>
                        </View>

                        {arr.map((name, index) => (
                            <TouchableWithoutFeedback key={index} onLongPress={() => setManageCategory(true)}>
                                <View>
                                    <BudgetProgressCard title={name}/>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}

                        <BudgetCharts/>

                        {manageCategory && (
                            <OffCanvasModel modalVisible={manageCategory} setModalVisible={setManageCategory}
                                            height={250}>
                                <View className="mb-4">
                                    <Text className={'text-lg font-semibold'}>Customize Categories</Text>
                                </View>

                                <View className={'flex-row flex-wrap gap-y-3'}>

                                    {categories.map((category, index) => {

                                        let dot = ''

                                        if (arr.includes(category.title)) {
                                            dot = <View
                                                className={'absolute bg-green-500 p-1 rounded-full right-0 -top-0.5'}></View>
                                        }

                                        return (
                                            <TouchableOpacity key={index} onPress={() => handlePress(category)}>
                                                <View
                                                    className={`${category.color} relative h-12 w-12 flex rounded-lg flex-row items-center justify-center mr-2`}>
                                                    {category.iconSmall}
                                                    {dot}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}

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

                        <ManageBudgetModal
                            add={true}
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />

                    </View>
                </Animated.ScrollView>
            </Animated.View>
        </View>
    );
};

export default BudgetScreen;
