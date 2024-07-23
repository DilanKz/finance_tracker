import { TouchableOpacity, View, Text } from "react-native";

const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity
        onPress={onPress}
        className={`border ${selected ? 'border-violet-200 bg-violet-200' : 'border-gray-400 bg-white'} p-3 rounded-3xl`}
    >
        <Text className={`text-center ${selected ? 'text-customPurple' : 'text-black'}`}>{label}</Text>
    </TouchableOpacity>
);

const RadioButtonGroup = ({ options, selectedValue, onSelect }) => (
    <View className="flex-row flex-wrap -mx-3">
        {options.map(option => (
            <View key={option.value} className="w-1/3 px-3 mb-3">
                <RadioButton
                    selected={selectedValue === option.value}
                    onPress={() => onSelect(option.value)}
                    label={option.label}
                />
            </View>
        ))}
    </View>
);

export default RadioButtonGroup;
