import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Main_screen from '../Screens/User_Screen/Main_screen';


const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Main' component={Main_screen} />
        </Tab.Navigator>
    )
}

export { BottomTabNavigator }