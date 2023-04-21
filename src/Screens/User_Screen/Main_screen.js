import { Alert, BackHandler, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Header, Style } from '../../Components/Common';
import { RFValue } from 'react-native-responsive-fontsize';
import { Black } from '../../Components/InitialValue/Colors';
import { MainModel } from '../../Components/Model/MainModel';

const Main_screen = (props) => {
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <View>

                </View>
                <View style={styles.actionContainer}>
                    {
                        MainModel.map((value, index) => {
                            return (
                                <View style={{ ...styles.action, width: value.id != 5 ? '45%' : '93%', }}>
                                    <Image resizeMode='contain' resizeMethod='resize' source={value.image} />
                                    <Text style={styles.text}>{value.text}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default React.memo(Main_screen)

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
         flexWrap: 'wrap', 
         justifyContent: 'space-evenly',
         padding:20
    },
    action: {
        backgroundColor: '#EDF2F4',
        borderRadius: 30,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:25
    },
    text: {
        fontSize: RFValue(16),
        fontFamily: 'BYekan',
        color: Black
    }
})