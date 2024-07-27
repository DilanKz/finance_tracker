import React from 'react';
import {FontAwesome6, MaterialCommunityIcons} from '@expo/vector-icons';

export const categories = [
    {
        title: 'Shopping',
        icon: <FontAwesome6 name="basket-shopping" size={42} color="#F59E0B" />,
        iconSmall: <FontAwesome6 name="basket-shopping" size={18} color="#F59E0B" />,
        color: 'bg-amber-200',
        category: 'expense',
        titleColor: 'text-amber-700',
        colorHex:'#F59E0B',
    },
    {
        title: 'Food',
        icon: <FontAwesome6 name="utensils" size={42} color="#EF4444" />,
        iconSmall: <FontAwesome6 name="utensils" size={18} color="#EF4444" />,
        color: 'bg-red-200',
        category: 'expense',
        titleColor: 'text-red-700',
        colorHex:'#EF4444',
    },
    {
        title: 'Transportation',
        icon: <FontAwesome6 name="bus" size={42} color="#10B981" />,
        iconSmall: <FontAwesome6 name="bus" size={18} color="#10B981" />,
        color: 'bg-green-200',
        category: 'expense',
        titleColor: 'text-green-700',
        colorHex:'#10B981',
    },
    {
        title: 'Entertainment',
        icon: <FontAwesome6 name="film" size={42} color="#8B5CF6" />,
        iconSmall: <FontAwesome6 name="film" size={18} color="#8B5CF6" />,
        color: 'bg-purple-200',
        category: 'expense',
        titleColor: 'text-purple-700',
        colorHex:'#8B5CF6',
    },
    {
        title: 'Bills',
        icon: <FontAwesome6 name="file-invoice-dollar" size={42} color="#3B82F6" />,
        iconSmall: <FontAwesome6 name="file-invoice-dollar" size={18} color="#3B82F6" />,
        color: 'bg-blue-200',
        category: 'expense',
        titleColor: 'text-blue-700',
        colorHex:'#3B82F6',
    },
    {
        title: 'Health',
        icon: <MaterialCommunityIcons name="heart-pulse" size={42} color="#10B981" />,
        iconSmall: <MaterialCommunityIcons name="heart-pulse" size={18} color="#10B981" />,
        color: 'bg-green-200',
        category: 'expense',
        titleColor: 'text-green-700',
        colorHex:'#10B981',
    },
    {
        title: 'Travel',
        icon: <FontAwesome6 name="plane" size={42} color="#3B82F6" />,
        iconSmall: <FontAwesome6 name="plane" size={18} color="#3B82F6" />,
        color: 'bg-blue-200',
        category: 'expense',
        titleColor: 'text-blue-700',
        colorHex:'#3B82F6',
    },
    {
        title: 'Salary',
        icon: <MaterialCommunityIcons name="cash-multiple" size={42} color="#FBBF24" />,
        iconSmall: <MaterialCommunityIcons name="cash-multiple" size={18} color="#FBBF24" />,
        color: 'bg-yellow-200',
        category: 'income',
        titleColor: 'text-yellow-700',
        colorHex:'#FBBF24',
    },
    {
        title: 'Others',
        icon: <MaterialCommunityIcons name="dots-horizontal" size={42} color="#9CA3AF" />,
        iconSmall: <MaterialCommunityIcons name="dots-horizontal" size={24} color="#9CA3AF" />,
        color: 'bg-gray-200',
        category: 'expense',
        titleColor: 'text-gray-700',
        colorHex:'#9CA3AF',
    }
];

export const getCategoryByTitle = (title) => {
    return categories.find(category => category.title === title);
};

export default categories;
