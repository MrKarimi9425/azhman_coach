import { Alert, Dimensions, Image, Linking, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { Black, Blue, Gray, White } from '../../InitialValue/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, Input, isSet, Loading, useFetch } from '../../Common';

const validationSchema = yup.object().shape({
    phoneNumber: yup.string().matches('^(\\+98?)?{?(09[0-9]{9,9}}?)$', 'شماره تلفن وارد شده اشتباه است')
        .required('شماره خود را وارد کنید')
});

const Content_Login = (props) => {
    const { openAlert } = useWindowDimensions()
    const { navigate } = useNavigation()
    const { data, doFetch, loading } = useFetch('guest/getmobile', true);
    useEffect(() => {
        if (isSet(data)) {
            if (data.res !== 1) {
                openAlert('warning', 'ورود', data["msg"])
            } else if (data.data.exist !== 0) {
                navigate('guest', { screen: 'Code', params: { code: data.data.codeSms, mobile: data.data.mobile } })
            } else {
                navigate('guest', { screen: 'SignUp', params: { code: data.data.codeSms, mobile: data.data.mobile } })
            }
        }
    }, [data])

    return (
        <>
            <View style={styles.titleContainer}>
                <Image resizeMode='contain' source={require('../../../assets/images/leftLogin.png')} />
                <Text style={styles.title}>ورود</Text>
                <Image resizeMode='contain' source={require('../../../assets/images/rightLogin.png')} />
            </View>
            <Formik validationSchema={validationSchema} initialValues={{ phoneNumber: '' }} onSubmit={(values, { setSubmitting }) => {
                doFetch({ mobile: values.phoneNumber })
                setSubmitting(false)
            }}>
                {
                    ({
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        values
                    }) => (
                        <>
                            <View style={styles.formContainer}>
                                <Input values={values.phoneNumber}
                                    errors={errors.phoneNumber}
                                    title={'شماره تماس'}
                                    keyboardType={'decimal-pad'}
                                    handleBlur={handleBlur("phoneNumber")}
                                    handleChange={handleChange("phoneNumber")}
                                    touched={touched.phoneNumber}
                                    icon={() => (
                                        <View style={styles.inputIcon}>
                                            <FontAwesome name='phone' style={styles.icon} />
                                        </View>
                                    )}
                                />
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Image source={require('../../../assets/images/leftLogin.png')} />
                                        <Text style={styles.text}>ورود با</Text>
                                        <Image source={require('../../../assets/images/rightLogin.png')} />
                                    </View>
                                    <View style={{ ...styles.titleContainer, marginTop: 10 }}>
                                        <Image source={require('../../../assets/images/Google.png')} />
                                        <Image source={require('../../../assets/images/Facebook.png')} />
                                        <Image source={require('../../../assets/images/Twitter.png')} />
                                    </View>
                                </View>
                                <Button
                                    style={{ margin: 30 }}
                                    title={'دریافت کد'}
                                    onPress={handleSubmit}
                                />
                                <Text style={styles.policyText}>همه
                                    <Text onPress={() => Linking.openURL('https://azhman.online/site/policy')} style={{ ...styles.policyText, color: Blue, textDecorationLine: 'underline' }}> قوانین و مقررات </Text>
                                    را میپذیرم
                                </Text>
                            </View>
                        </>
                    )
                }
            </Formik>
            <Modal visible={loading}>
                <Loading />
            </Modal>
        </>
    )
}

export default React.memo(Content_Login)

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    title: {
        fontSize: RFValue(16),
        fontFamily: 'BYekan',
        color: Black,
        textAlign: 'center',
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 2,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'red'
    },
    icon: {
        fontSize: RFValue(20),
        color: Gray
    },
    policyText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan'
    }
})