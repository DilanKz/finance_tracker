import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import categories from "../../utils/constants";
import {useState} from "react";
import ManageBudgetModal from "../core/manageBudgetModal";
import UserController from "../../db/controllers/UserController";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBudget = ({setScreen}) => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [budget, setBudget] = useState('0');
    const [name, setName] = useState('');
    const [selectedCategoriesArr, setSelectedCategoriesArr] = useState([]);
    const [totalCategoryBudget, setTotalCategoryBudget] = useState(0);

    const handlePress = (category) => {
        if (budget) {
            setSelectedCategory(category);
            setModalVisible(true);
        } else {
            alert('Enter a budget first')
        }
    };

    const handleTextChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');

        setBudget(numericValue);
    };

    const addToArray = (categoryBudget) => {
        const newBudget = Number(categoryBudget) + totalCategoryBudget;

        if (budget < newBudget) {
            alert(`Your ${selectedCategory.title} budget exceeds the total budget`);
        } else {
            const existingCategoryIndex = selectedCategoriesArr.findIndex(
                (item) => item.title === selectedCategory.title
            );

            if (existingCategoryIndex > -1) {
                const updatedArr = [...selectedCategoriesArr];
                updatedArr[existingCategoryIndex] = {
                    ...updatedArr[existingCategoryIndex],
                    budget: categoryBudget,
                    remaining: categoryBudget,
                    used: '0',
                };
                setSelectedCategoriesArr(updatedArr);
            } else {
                const newObj = {
                    title: selectedCategory.title,
                    budget: categoryBudget,
                    remaining: categoryBudget,
                    used: '0',
                };
                const updatedArr = [...selectedCategoriesArr, newObj];
                setSelectedCategoriesArr(updatedArr);
            }

            setTotalCategoryBudget(newBudget);
        }
    }



    const handleSetupAccount = async () => {
        if (name.trim() === '' || name.length <= 2) {
            console.log(name)
            alert('add a valid name')
        } else if (budget.trim() === '' || budget.trim() === '0') {
            alert('add a valid budget')
        } else if (selectedCategoriesArr.length <= 2) {
            alert('add 3 categories to continue ')
        }else {

            let breakdownArr = [...selectedCategoriesArr];

            if (totalCategoryBudget < Number(budget)) {
                const otherBudget = Number(budget) - totalCategoryBudget;
                const others = { title: 'Others', budget: otherBudget.toString(), remaining: otherBudget.toString(), used: '0' }

                breakdownArr = [...selectedCategoriesArr, others];
            }

            const user = {
                id: Date.now().toString(),
                username: name,
                budget: budget,
                income: '0',
                expense: '0',
                breakdowns: breakdownArr,
            };

            console.log(user)

            await UserController.addSampleUser(user).then(async res => {
                console.log('response :', res)
                if (res.success) {
                    try {
                        await AsyncStorage.setItem('userData', JSON.stringify(res.data));
                        navigation.navigate('main')
                    } catch (error) {
                        console.error('Error saving user data:', error);
                    }
                } else {
                    console.log('Failed to add user:', res.message);
                }
            })
        }
    }

    return (
        <View className={'w-screen flex-1 bg-customPurple'}>
            <View className={'mt-16 w-full py-2 px-4 flex flex-row text-center'}>
                {/*<TouchableOpacity
                    onPress={() => setScreen('boarding')}
                    className="absolute left-4 top-0 bottom-0 flex items-center justify-center z-10"
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-black flex-1 text-center">Set up your account</Text>*/}
            </View>

            <Text className="ml-4 my-4 text-4xl font-semibold text-white">Let’s setup your account!</Text>
            {/*<Text className="ml-4 my-4 text-lg font-semibold text-white opacity-50">Add your name and monthly budget.</Text>*/}

            <View className={'px-4 mt-16 mb-8'}>
                <Text className="text-lg text-white font-semibold">Budget</Text>

                <View className={'flex-row items-center'}>
                    <Text className="text-5xl text-white font-semibold mr-2">LKR</Text>
                    <TextInput
                        value={budget}
                        keyboardType={'numeric'}
                        onChangeText={handleTextChange}
                        placeholderTextColor={'#fff'}
                        className={'text-5xl text-white font-bold mt-0 flex-1'}
                    />
                </View>
            </View>

            <View className={'flex-1 bg-white rounded-t-3xl pt-6 px-4'}>
                <View className={'flex-row border border-gray-200 p-2 rounded-xl'}>
                    <TextInput
                        value={name}
                        placeholder={'Name'}
                        onChangeText={setName}
                        className={'text-lg flex-1'}
                    />
                </View>

                <Text className="text-sm text-gray-500 font-semibold mt-8 ml-1 mb-1">Select Categories</Text>
                <ScrollView className={'flex-1 border border-gray-200 p-2 rounded-xl mb-4'}>
                    <View className={'flex-row flex-wrap gap-y-3 pt-2'}>

                        {categories.map((category, index) => {
                            if (category.category !== 'income') {
                                if (category.title !== 'Others') {
                                    let dot = '';
                                    if (selectedCategoriesArr.some(item => item.title === category.title)) {
                                        dot = (
                                            <View className="absolute bg-green-500 p-1 rounded-full right-0 -top-0.5"></View>
                                        );
                                    }

                                    return (
                                        <TouchableOpacity key={index} onPress={() => handlePress(category)}>
                                            <View
                                                className={`${category.color} relative h-12 w-12 flex rounded-lg flex-row items-center justify-center mr-2`}>
                                                {category.iconSmall}
                                                {dot}
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }
                                return null;
                            }
                            return null;
                        })}


                    </View>
                </ScrollView>

                <View className={'flex-row border border-gray-200 mb-4 rounded-xl'}>
                    <TouchableOpacity className={'w-full flex items-center py-4 bg-customPurple rounded-xl mb-4'} onPress={handleSetupAccount}>
                        <Text className={'text-xl text-gray-100'}>Let’s go</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {modalVisible ?
                <ManageBudgetModal
                    add={true}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onAddClick={addToArray}
                /> : ''
            }

        </View>
    )
}

export default AddBudget
