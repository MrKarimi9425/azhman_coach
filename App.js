import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Context } from './src/Storage/Context';
import { AppStack, AuthStack } from './src/Navigation';
import { getStore } from './src/Storage/Async';
import { version } from './package.json'

const Stack = createStackNavigator();
const App = () => {
    const [checkVersion, setCheckVersion] = useState({
        version: 0,
        url: null
    })
    const [appVersion] = useState(version)

    const [auth_key, setAuth_key] = useState(null)
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        type: '',
        title: '',
        message: '',
    })
    const value = {
        SET_KEY: value => setAuth_key(value),
        GET_KEY: auth_key,
        alertConfig: alertConfig,
        openAlert: (type, title, message) => {
            setAlertConfig({
                visible: true,
                type: type,
                title: title,
                message: message,
            })
        },
        closeAlert: () => {
            setAlertConfig({
                visible: false,
            })
        },
        version: appVersion,
        checkVersion: checkVersion,
        setCheckVersion: (version, url) => {
            setCheckVersion({
                version: version,
                url: url
            })
        },
        
    }

    return (
        <Context.Provider value={value}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='guest' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='user' component={AppStack} />
                    <Stack.Screen name='guest' component={AuthStack} />
                </Stack.Navigator>
            </NavigationContainer>
        </Context.Provider>
    )
}

export default React.memo(App);
