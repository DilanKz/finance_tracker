import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import TransactionDetailCard from "../../components/transactions/transactionDetailCard";
import RadioButtonGroup from "../../components/core/radioButtonGroup";

const dateOptions = [
    {label: 'Day', value: 'Day'},
    {label: 'Week', value: 'Week'},
    {label: 'Month', value: 'Month'},
    {label: 'Year', value: 'Year'},
];
const filterOptionArr = [
    {label: 'Income', value: 'Income'},
    {label: 'Expense', value: 'Expense'},
];
const sortOptionArr = [
    {label: 'Highest', value: 'Highest'},
    {label: 'Lowest', value: 'Lowest'},
    {label: 'Oldest', value: 'Oldest'},
    {label: 'Newest', value: 'Newest'},
];

const {height: windowHeight} = Dimensions.get('window');

const TransactionScreen = () => {
    const [selectedValue, setSelectedValue] = useState('Month');
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(windowHeight)).current;
    const [filterByOptions, setFilterByOptions] = useState(null);
    const [sortByOptions, setSortByOptions] = useState(null);

    const toggleModal = () => {
        if (modalVisible) {
            Animated.timing(slideAnim, {
                toValue: windowHeight,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setModalVisible(false));
        } else {
            setModalVisible(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const clearFilter = () => {
        setSortByOptions(null);
        setFilterByOptions(null)
    }

    useEffect(() => {
        if (!modalVisible) {
            slideAnim.setValue(windowHeight);
        }
    }, [modalVisible]);

    return (
        <View className="flex-1 px-4 bg-white">
            <View className="mt-16 w-full py-2 flex flex-row justify-between items-center">
                <View className="border border-gray-200 rounded-full bg-white px-2 py-1">
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={dateOptions}
                        value={selectedValue}
                        style={{
                            inputIOS: styles.inputIOS,
                            inputAndroid: styles.inputAndroid,
                            iconContainer: styles.iconContainer,
                        }}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => (
                            <FontAwesome5 name="chevron-down" size={12} color="#8a2be2"/>
                        )}
                    />
                </View>

                <TouchableOpacity className="bg-white border border-gray-200 rounded-md px-2 py-1"
                                  onPress={toggleModal}>
                    <MaterialIcons name="filter-list" size={24} color="black"/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity className={'bg-violet-200 p-3 rounded-md my-3 flex-row justify-between items-center'}>
                <Text className={'text-violet-700'}>See your financial report</Text>
                <FontAwesome5 name="chevron-right" size={18} color={'rgb(109 40 217)'}/>
            </TouchableOpacity>

            <ScrollView className="flex-1">
                <View className="">
                    <TransactionDetailCard
                        title={'Today'}
                        filter={'today'}
                    />
                    <TransactionDetailCard
                        title={'Yesterday'}
                        filter={'yesterday'}
                    />
                    <TransactionDetailCard
                        title={'This Month'}
                        filter={'month'}
                    />
                </View>
            </ScrollView>


            <Modal
                visible={modalVisible}
                transparent
                animationType="none"
                onRequestClose={toggleModal}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View className="flex-1 justify-end" style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={{
                                    transform: [{translateY: slideAnim}],
                                    height: 350,
                                    backgroundColor: 'white',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    padding: 16,
                                    shadowColor: "#000",
                                    shadowOffset: {width: 0, height: 2},
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <View className={'flex-row justify-between'}>
                                    <Text className="text-lg font-semibold">Filter Transaction </Text>
                                    <TouchableOpacity className={'rounded-2xl bg-violet-200 px-3 py-1'} onPress={clearFilter}>
                                        <Text className={'text-customPurple'}>Reset</Text>
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-1 mt-4">
                                    <Text className="text-lg mb-4 font-semibold">Filter By</Text>
                                    <RadioButtonGroup
                                        options={filterOptionArr}
                                        selectedValue={filterByOptions}
                                        onSelect={value => setFilterByOptions(value)}
                                    />
                                </View>
                                <View className="flex-1 -mt-10">
                                    <Text className="text-lg mb-4 font-semibold">Sort By</Text>
                                    <RadioButtonGroup
                                        options={sortOptionArr}
                                        selectedValue={sortByOptions}
                                        onSelect={value => setSortByOptions(value)}
                                    />
                                </View>

                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({

    inputIOS: {
        height: 20,
        width: 100,
        paddingHorizontal: 10,
        color: 'black',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    inputAndroid: {
        height: 40,
        width: 100,
        paddingHorizontal: 10,
        color: 'black',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    iconContainer: {
        top: Platform.OS === 'ios' ? 10 : 15,
        right: 10,
    },
});

export default TransactionScreen;
