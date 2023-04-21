import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gray, White } from '../../InitialValue/Colors'

const Icons = () => {
    const [fadeAnimation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [])
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      
        </View>
    )
}

export default Icons

const styles = StyleSheet.create({
    iconContainer: {
        margin: 20
    },
    icon: {
        width: 30,
        height: 30,
    },
    viewerIcon: {
        backgroundColor: Gray,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        opacity: 0.7,
        borderRadius: 10
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewerCount: {
        color: White,
        margin: 5,
        fontFamily: 'BYekan'
    }
})