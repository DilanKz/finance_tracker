import React, {useContext, useEffect, useRef, useState} from 'react';
import {Animated, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import BudgetCharts from "../../components/core/budgetCharts";
import {BudgetProgressCard} from "../../components/budget/budgetProgressCard";
import {FontAwesome6, MaterialIcons} from "@expo/vector-icons";
import {OffCanvasModel} from "../../components/core/offcanvasModel";
import categories, {getCategoryByTitle} from "../../utils/constants";
import ManageBudgetModal from "../../components/core/manageBudgetModal";
import {UserContext} from "../../components/context/userProvider";
import TransactionController from "../../db/controllers/TransactionController";

const arr = ['Shopping', 'Food', 'Travel', 'Others'];

const BudgetScreen = () => {

    const { user, setUser } =useContext(UserContext)

    const [manageCategory, setManageCategory] = useState(false);
    const [editBudget, setEditBudget] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [popupState, setPopupState] = useState();
    const [dataArray, setDataArray] = useState([]);


    const scrollY = useRef(new Animated.Value(0)).current;

    const handlePress = (category, add) => {
        setPopupState(add)
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

    const loadCategorisedTransactions = async () => {
        await TransactionController.loadAllCategorizedTransactions().then(res => {
            if (res.success) {
                setDataArray(res.data)
                console.log('data : ', res.data)
            }
        })
    }

    useEffect(() => {
        loadCategorisedTransactions()
    }, []);

    const getRemainingBudget = () => {
        let budget = Number(user.budget)
        let used = Number(user.expense)

        let remaining = budget - used;

        if (remaining >= 0) {
            return `LKR ${remaining}`
        } else {
            return `-LKR ${Math.abs(remaining)}`
        }

    }

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
                        <Text className="text-6xl font-bold text-white text-center">LKR {user.budget}</Text>

                        <View className={'flex-row justify-between'}>
                            <Text className="text-lg font-semibold text-white mt-4">Used</Text>
                            <Text className="text-lg font-semibold text-white mt-4">LKR {user.expense}</Text>
                        </View>
                        <View className={'flex-row justify-between'}>
                            <Text className="text-lg font-semibold text-white">Remaining</Text>
                            <Text className="text-lg font-semibold text-white">{getRemainingBudget()}</Text>
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

                        {dataArray.length > 0 ?
                            <>
                                {dataArray.map((item, index) => {

                                    const category = getCategoryByTitle(item.title);

                                    return (
                                        <TouchableWithoutFeedback key={index} onLongPress={() => handlePress(category,false)}>
                                            <View>
                                                <BudgetProgressCard data={item} category={category} title={item.title}/>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })}
                            </>
                            :
                            <View className={'h-96 flex-1 justify-center items-center'}>
                                <Text>wow it's empty</Text>
                            </View>
                        }

                        {/*<BudgetCharts/>*/}

                        {manageCategory && (
                            <OffCanvasModel modalVisible={manageCategory} setModalVisible={setManageCategory}
                                            height={250}>
                                <View className="mb-4">
                                    <Text className={'text-lg font-semibold'}>Customize Categories</Text>
                                </View>

                                <View className={'flex-row flex-wrap gap-y-3'}>

                                    {categories.map((category, index) => {

                                        let dot = ''

                                        /*if (arr.includes(category.title)) {
                                            dot = <View
                                                className={'absolute bg-green-500 p-1 rounded-full right-0 -top-0.5'}></View>
                                        }*/

                                        return (
                                            <TouchableOpacity key={index} onPress={() => handlePress(category, dot === '')}>
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
                                <View className={'flex-1'}>
                                    <View className={'flex-row border border-gray-200 p-2 rounded-xl'}>
                                        <TextInput
                                            placeholder={'Name'}
                                            className={'text-lg flex-1'}
                                        />
                                    </View>
                                    <View className={'flex-row border border-gray-200 mb-4 rounded-xl'}>
                                        <TouchableOpacity className={'w-full flex items-center py-4 bg-customPurple rounded-xl mb-4'}>
                                            <Text className={'text-xl text-gray-100'}>Let’s go</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </OffCanvasModel>
                        )}

                        {modalVisible ?
                            <ManageBudgetModal
                                add={popupState}
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            /> : ''
                        }

                    </View>
                </Animated.ScrollView>
            </Animated.View>
        </View>
    );
};

export default BudgetScreen;
