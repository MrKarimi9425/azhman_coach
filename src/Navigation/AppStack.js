import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { CustomDrawer } from './CustomDrawer';
import 'react-native-gesture-handler';
import LivesToday from '../Screens/User_Screen/LivesToday';
import Live from '../Screens/User_Screen/Live';
import Main_screen from '../Screens/User_Screen/Main_screen';

const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        <Drawer.Navigator initialRouteName='LivesToday'
            screenOptions={{ headerShown: false, drawerPosition: 'right' }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            {/* <Drawer.Screen name='Main' component={Main_screen} /> */}
            <Drawer.Screen name={'LivesToday'} component={LivesToday} />
            <Drawer.Screen name={'Live'} component={Live} />
        </Drawer.Navigator>
    )
}

export { AppStack }