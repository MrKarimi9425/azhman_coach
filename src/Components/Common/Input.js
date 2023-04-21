import React from "react";
import { View, TextInput, ToastAndroid, StyleSheet, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Black, Blue, Gray, WhiteSmoke } from "../../Components/InitialValue/Colors";

const Input = ({ errors, touched, values, handleChange, handleBlur, placeholder, keyboardType = 'default', icon, style, title }) => {
    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.container}>
                {
                    (errors && touched) &&
                    <Ripple onPress={() => {
                        ToastAndroid.showWithGravity(
                            errors,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        )
                    }}>
                        <AntDesign style={styles.icon} name={"exclamationcircleo"} />
                    </Ripple>
                }
                <View style={[styles.input, style, (errors && touched) && { borderColor: '#ff5e5e', borderBottomWidth: 1, width: '90%' }]}>
                    {
                        typeof icon !== 'undefined' && icon()
                    }
                    <TextInput
                        onChangeText={handleChange}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        textAlign={"center"}
                        value={values}
                        onBlur={handleBlur}
                        style={styles.textInput} />
                </View>
            </View>
        </View>
    );
};
export { Input }

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: '100%',
        textAlign: 'right',
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Gray
    },
    input: {
        backgroundColor: WhiteSmoke,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    textInput: {
        width: '80%',
        fontFamily: 'BYekan',
        color: Black
    },
    icon: {
        padding: 5,
        fontSize: RFValue(20),
        color: 'red'
    }
})