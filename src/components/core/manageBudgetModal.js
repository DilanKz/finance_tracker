import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

const ManageBudgetModal = ({modalVisible, setModalVisible, selectedCategory, setSelectedCategory, add}) => {

    const closeModal = () => {
        setModalVisible(false);
    };

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
                                <Text className={'font-semibold text-lg'}>{add ? 'Add' : 'Edit'} Category</Text>
                                <View
                                    className={`${selectedCategory.color} w-8 h-8 rounded-md flex-row justify-center items-center`}>
                                    {selectedCategory.iconSmall}
                                </View>
                            </View>

                            <View className={'flex-row my-4 items-center border border-gray-200 rounded-md'}>
                                <TextInput
                                    className={'text-lg flex-1 flex-row ml-2'}
                                    placeholder={'Add Amount'}
                                    keyboardType={'numeric'}
                                />
                            </View>

                            <View className={'flex-row justify-end mt-2'}>
                                <TouchableOpacity disabled={add}
                                                  className={'flex-row justify-center bg-red-600 py-1 w-16 rounded-md mr-2'}>
                                    <Text className={'text-white'}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={'flex-row justify-center bg-emerald-600 py-1 w-16 rounded-md mr-2'}>
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
