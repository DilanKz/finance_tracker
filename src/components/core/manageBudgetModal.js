import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {useState} from "react";
import { FontAwesome5 } from '@expo/vector-icons';
const ManageBudgetModal = ({modalVisible, setModalVisible, selectedCategory, setSelectedCategory, add, onAddClick}) => {

    const [amount, setAmount] = useState('');

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleTextChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');

        setAmount(numericValue);
    };

    const handleAddOnClick = () => {
        onAddClick(amount)
        closeModal()
    }

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View className='flex-1 justify-center items-center bg-opacity-50'
                      style={{backgroundColor: 'rgba(0,0,0,0.25)'}}>
                    <TouchableWithoutFeedback>
                        <View className='w-80 p-4 bg-white rounded-lg'>

                            <View className={'flex-row justify-between'}>
                                <Text className={'font-semibold text-gray-900'}>{add ? 'Add' : 'Edit'} Category</Text>
                                <View
                                    className={`${selectedCategory.color} w-8 h-8 rounded-md flex-row justify-center items-center`}>
                                    {selectedCategory.iconSmall}
                                </View>
                            </View>

                            <View className={'flex-row mt-2 gap-x-2 items-center'}>
                                <Text className={`p-1 font-semibold rounded-md ${selectedCategory.color}`}
                                      style={{color:selectedCategory.colorHex}}
                                >
                                    {selectedCategory.title}
                                </Text>

                                {selectedCategory.category === 'expense' ?
                                    <View className={'bg-red-200 h-7 w-7 flex-row justify-center items-center rounded-md'}>
                                        <FontAwesome5 name="arrow-up" size={14} color="red" />
                                    </View> :

                                    <View className={'bg-green-200 h-7 w-7 flex-row justify-center items-center rounded-md'}>
                                        <FontAwesome5 name="arrow-down" size={14} color="green" />
                                    </View>
                                }
                            </View>

                            <View className={'flex-row mb-4 mt-2 items-center border border-gray-200 rounded-md'}>
                                <TextInput
                                    value={amount}
                                    keyboardType={'numeric'}
                                    placeholder={'Add Amount'}
                                    onChangeText={handleTextChange}
                                    className={'text-lg flex-1 flex-row ml-2'}
                                />
                            </View>

                            <View className={'flex-row justify-end mt-1'}>
                                {!add ? <TouchableOpacity
                                    className={'flex-row justify-center bg-red-600 py-1 w-16 rounded-md mr-2'}>
                                    <Text className={'text-white'}>Delete</Text>
                                </TouchableOpacity> :''}
                                <TouchableOpacity
                                    onPress={handleAddOnClick}
                                    className={'flex-row justify-center bg-emerald-600 py-1 w-16 rounded-md'}>
                                    <Text className={'text-white'}>Add</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ManageBudgetModal
