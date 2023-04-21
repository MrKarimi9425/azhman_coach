import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, TextInput, ToastAndroid, useWindowDimensions, View } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { Black, Gray, White } from '../../InitialValue/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from "yup";
import { ErrorMassages, text } from '../../Common/ErrorMassages';
import { setStore } from '../../../Storage/Async';
import { Context } from '../../../Storage/Context';
import { Button, Input, isSet, Loading, useFetch } from '../../Common';


const Content_SmsCode = (props) => {
    const { replace, goBack } = useNavigation()
    const { SET_KEY } = useContext(Context)

    const { data, doFetch, loading } = useFetch('guest/login_by_code', true);

    const validationSchema = yup.object().shape({
        code: yup.string().matches(props.route.params.code, 'کد وارد شده اشتباه است')
            .required('کد تایید خود را وارد کنید')
    });

    useMemo(() => {
        if (isSet(data)) {
            if (data.res !== 1) {
                ErrorMassages(data.msg)
            } else {
                setStore('@auth_key', data["data"]["auth_key"])
                SET_KEY(data["data"]["auth_key"])
                replace('user', { screen: 'LivesToday' })
            }
        }
    }, [data])

    return (
        <>
            <View style={styles.titleContainer}>
                <Image resizeMode='contain' source={require('../../../assets/images/leftLogin.png')} />
                <Text style={styles.title}>تایید شماره تلفن</Text>
                <Image resizeMode='contain' source={require('../../../assets/images/rightLogin.png')} />
            </View>
            <Formik validationSchema={validationSchema} initialValues={{ code: '' }} onSubmit={(values, { setSubmitting }) => {
                doFetch({ code: values.code, mobile: props.route.params.mobile })
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
                        <View style={styles.contentContainer}>
                            <Input values={values.code}
                                errors={errors.code}
                                title={"کد تایید"}
                                keyboardType={'decimal-pad'}
                                handleBlur={handleBlur("code")}
                                handleChange={handleChange("code")}
                                touched={touched.code}
                                icon={() => (
                                    <View style={styles.inputIcon}>
                                        <MaterialCommunityIcons name='email-edit-outline' style={styles.icon} />
                                    </View>
                                )}
                            />
                            <Text style={styles.forgettenText}>ارسال رمز مجدد</Text>
                            <Text onPress={() => goBack()} style={styles.forgettenText}>شماره تلفن را اشتباه وارد کردید؟</Text>
                            {/* <Text>فراموشی رمز عبور</Text> */}
                            <Button
                                title={'ورود'}
                                onPress={handleSubmit}
                            />
                        </View>
                    )
                }
            </Formik>
            <Modal visible={loading}>
                <Loading />
            </Modal>
        </>
    )
}

export default React.memo(Content_SmsCode)

const styles = StyleSheet.create({
    text: {
        fontSize: RFValue(24),
        fontFamily: 'BYekan',
        color: Black
    },
    forgettenText: {
        fontFamily: 'BYekan',
        color: Gray,
        fontSize: RFValue(14)
    },
    icon: {
        fontSize: RFValue(20),
        color: Gray,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 30
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
});