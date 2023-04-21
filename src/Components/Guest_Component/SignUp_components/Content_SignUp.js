import { FlatList, Image, Modal, Pressable, StyleSheet, Text, ToastAndroid, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import * as yup from "yup";
import { Black, Blue, Gray, White, WhiteSmoke } from '../../InitialValue/Colors';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'
import Ripple from 'react-native-material-ripple';
import { ErrorMassages } from '../../Common/ErrorMassages';
import { RFValue } from 'react-native-responsive-fontsize';
import { setAuth_key, setStore } from '../../../Storage/Async';
import { Context } from '../../../Storage/Context';
import { Button, DropDown, Input, isSet, Loading, useFetch } from '../../Common';



const Content_SignUp = (props) => {
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions();
    const [modal, setModal] = useState(false)
    const { SET_KEY } = useContext(Context);
    const [position, setPosition] = useState('country')

    const [country, setCountry] = useState({
        name: '',
        id: ''
    })
    const [province, setProvince] = useState({
        name: '',
        id: ''
    })
    const [city, setCity] = useState({
        name: '',
        id: ''
    })
    const [region, setRegion] = useState({
        name: '',
        id: ''
    })


    const validationSchema = yup.object().shape({
        name: yup.string().required('نام خود را وارد کنید'),
        lName: yup.string().required('نام خانوادگی خود را وارد کنید'),
        userName: yup.string().required('نام کاربری خود را وارد کنید'),
        tell: yup.string().required('شماره ثابت خود را وارد کنید'),
        code: yup.string().matches(props.route.params.code, 'کد وارد شده اشتباه است')
            .required('کد تایید خود را وارد کنید')
    })

    const { data, doFetch, loading } = useFetch('guest/signup', true);
    useMemo(() => {
        if (isSet(data)) {
            if (data.res !== 1) {
            } else {
                if (isSet(data.data.country)) setModal(!modal)
                if (isSet(data.data.province)) setModal(!modal)
            }
        }
    }, [data])

    const { data: dataCity, doFetch: doCity } = useFetch('guest/getcity', true);
    useMemo(() => {
        if (isSet(dataCity)) {
            if (data.res !== 1) {
            } else {
                if (isSet(dataCity.data)) setModal(!modal)
            }
        }
    }, [dataCity])



    const { data: dataRegion, doFetch: doRegion } = useFetch('guest/getregion', true);
    useMemo(() => {
        if (isSet(dataRegion)) {
            if (data.res !== 1) {
            } else {
                if (typeof data.data.country !== 'undefined' && data.data.country.length !== 0) setModal(!modal)
            }
        }
    }, [dataRegion])

    const { data: signup, doFetch: request, loading: loading2 } = useFetch('guest/signup', true);
    useMemo(() => {
        if (isSet(signup)) {
            if (signup.res !== 1) {
                const errors = ErrorMassages(data.msg)
                errors.forEach(value => {
                    ToastAndroid.showWithGravity(
                        value.msg,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    )
                })
            } else {
                setStore('@auth_key', signup.data.user.auth_key)
                SET_KEY(signup.data.user.auth_key)
                navigation.navigate('LivesToday')
            }
        }
    }, [signup])


    const Items = ({ data, onPress }) => {
        return (
            <FlatList
                data={data} renderItem={({ item }) => {
                    return (
                        <Ripple onPress={() => {
                            onPress(item)
                            setModal(!modal)
                        }} style={styles.modal.country.textContainer} >
                            {
                                position == 'country' ?
                                    <Text style={{ ...styles.modal.country.text, textDecorationLine: 'underline' }}>+{item.id}</Text> : null
                            }

                            <Text style={styles.modal.country.text}>{item.name}</Text>
                        </Ripple>
                    )
                }}
                keyExtractor={(item, index) => item.id + index} />
        )
    }



    return (
        <>
            <View style={styles.titleContainer}>
                <Image resizeMode='contain' source={require('../../../assets/images/leftLogin.png')} />
                <Text style={styles.title}>ثبت نام</Text>
                <Image resizeMode='contain' source={require('../../../assets/images/rightLogin.png')} />
            </View>
            <View style={styles.imagePicker.container}>
                <Button
                    title={'انتخاب عکس'}
                    style={{ paddingHorizontal: 30 }}
                    textStyle={{ fontSize: RFValue(10) }}
                />
                <View style={{ ...styles.imagePicker.image, width: width / 4, height: width / 4, }}>
                    <FontAwesome name='photo' style={styles.imagePicker.icon} />
                </View>
            </View>
            <Formik validationSchema={validationSchema}
                initialValues={{
                    name: '',
                    lName: '',
                    userName: '',
                    tell: '',
                    code: ''
                }} onSubmit={(values, { setSubmitting }) => {
                    let required = 0;
                    if (typeof country !== 'undefined' || typeof province !== 'undefined' || typeof city !== 'undefined' || typeof region !== 'undefined') {
                        if (country.id == '') {
                            ToastAndroid.showWithGravity(
                                'کشور را انتخاب کنید',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            )
                            required++;
                            return;
                        }
                        if (province.id == '') {
                            ToastAndroid.showWithGravity(
                                'استان را انتخاب کنید',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            )
                            required++;
                            return;
                        }
                        if (city.id == '') {
                            ToastAndroid.showWithGravity(
                                'شهر را انتخاب کنید',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            )
                            required++;
                            return;

                        }
                        //     if (region.id == '') {
                        //         ToastAndroid.showWithGravity(
                        //             'منطقه را انتخاب کنید',
                        //             ToastAndroid.SHORT,
                        //             ToastAndroid.BOTTOM
                        //         )
                        //         received ++;
                        // }
                    }
                    if (required == 0) {
                        request({
                            name: values.name,
                            lName: values.lName,
                            userName: values.userName,
                            tell: values.tell,
                            mobile: props.route.params.mobile,
                            role: 'provider',
                            idCountry: country.id,
                            idProvince: province.id,
                            idCity: city.id,
                            idRegion: region.id,
                            nameImage: '',
                            codeSms: values.code,
                        })
                    }
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

                            <Input values={values.name}
                                errors={errors.name}
                                title={"نام"}
                                handleBlur={handleBlur("name")}
                                handleChange={handleChange("name")}
                                touched={touched.name}
                                icon={() => (
                                    <View style={styles.inputIcon}>
                                        <AntDesign name='user' size={25} />
                                    </View>
                                )}
                            />

                            <Input values={values.lName}
                                errors={errors.lName}
                                title={"نام خانوادگی"}
                                handleBlur={handleBlur("lName")}
                                handleChange={handleChange("lName")}
                                touched={touched.lName}
                                icon={() => (
                                    <View style={styles.inputIcon}>
                                        <AntDesign name='user' size={25} />
                                    </View>
                                )}
                            />
                            <Input values={values.userName}
                                errors={errors.userName}
                                title={"نام کاربری"}
                                handleBlur={handleBlur("userName")}
                                handleChange={handleChange("userName")}
                                touched={touched.userName}
                                icon={() => (
                                    <View style={styles.inputIcon}>
                                        <AntDesign name='user' size={25} />
                                    </View>
                                )}
                            />
                            <Input values={values.tell}
                                errors={errors.tell}
                                keyboardType={'decimal-pad'}
                                title={"تلفن ثابت"}
                                handleBlur={handleBlur("tell")}
                                handleChange={handleChange("tell")}
                                touched={touched.tell}
                                icon={() => (
                                    <View style={styles.inputIcon}>
                                        <Entypo name='old-phone' size={25} />
                                    </View>
                                )}
                            />
                            <Input values={values.code}
                                errors={errors.code}
                                title={"کد تایید"}
                                keyboardType={'decimal-pad'}
                                handleBlur={handleBlur("code")}
                                handleChange={handleChange("code")}
                                touched={touched.code}
                                icon={() => (
                                    <View style={styles.inputIcon}>
                                        <MaterialIcons name='verified-user' size={25} />
                                    </View>
                                )}
                            />

                            {/* کشور */}
                            <DropDown onPress={() => {
                                doFetch()
                                setPosition('country')
                            }}
                                selected={country}
                                placeholder={'کشور'}
                            />



                            {/* استان */}
                            {
                                country.name != '' ?
                                    <DropDown
                                        onPress={() => {
                                            setPosition('province')
                                            doFetch()
                                        }}
                                        selected={province}
                                        placeholder={'استان'}
                                    /> : null
                            }



                            {/* شهر */}
                            {
                                dataCity.length !== 0 ?
                                    <DropDown
                                        onPress={() => {
                                            setPosition('city')
                                            doCity({
                                                idProvince: province.id
                                            })
                                        }}
                                        selected={city}
                                        placeholder={'شهر'}
                                    /> : null
                            }



                            {/* منطقه */}
                            {
                                dataRegion.length !== 0 ?
                                    <DropDown
                                        onPress={() => {
                                            setPosition('region')
                                            doRegion()
                                        }}
                                        selected={region}
                                        placeholder={'منطقه'}
                                    /> : null
                            }


                            <Button
                                style={{ margin: 30 }}
                                onPress={handleSubmit}
                                title={'ثبت نام'}
                            />
                        </View>
                    )
                }
            </Formik>

            <Modal visible={modal} animationType={'fade'} transparent>
                <Pressable onPress={() => setModal(!modal)} style={styles.modal.modalConatiner} />
                {
                    isSet(data.data) &&
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.modal.country.itemContainer}>
                            {
                                isSet(data.data) &&
                                    position == 'country' ?
                                    <Items data={data.data.country}
                                        onPress={item => {
                                            setCountry({ name: item.name, id: item.id })
                                            setPosition('province')
                                            doFetch()
                                        }}
                                    />
                                    :
                                    position == 'province' ?
                                        <Items data={data.data.province}
                                            onPress={item => {
                                                setProvince({ name: item.name, id: item.id })
                                                doCity({
                                                    idProvince: item.id
                                                })
                                                setPosition('city')
                                            }}
                                        />
                                        :
                                        position == 'city' ?
                                            <Items data={dataCity.data}
                                                onPress={item => {
                                                    setCity({ name: item.name, id: item.id })
                                                    if (item.name == 'تهران') {
                                                        doRegion({
                                                            idCity: item.id
                                                        })
                                                    }
                                                }}
                                            />
                                            :
                                            position == 'region' ?
                                                <Items data={dataRegion.data}
                                                    onPress={item => {
                                                        setRegion({ name: item.name, id: item.id })
                                                    }}
                                                /> : null
                            }

                        </View>

                    </View>
                }

            </Modal>

            <Modal visible={loading2}>
                <Loading />
            </Modal>
        </>
    )
}




export default React.memo(Content_SignUp)

const styles = StyleSheet.create({
    perssable: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Blue,
        borderRadius: 10,
        width: '55%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25
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
    pressableText: {
        color: White,
        fontSize: RFValue(20),
        fontFamily: 'BYekan',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10
    },
    text: {
        fontSize: RFValue(24),
        fontFamily: 'BYekan',
        color: Black
    },
    contentContainer: {
        // flex: 2,
        alignItems: 'center',
        // marginTop: 100,
        paddingHorizontal: 30
    },
    modal: {
        modalConatiner: {
            position: 'absolute',
            backgroundColor: '#dbdbdb',
            width: '100%', height: '100%', opacity: 0.5
        },
        country: {
            itemContainer: {
                marginHorizontal: 20,
                marginVertical: 50, borderRadius: 15,
                backgroundColor: White, elevation: 15
            },
            textContainer: {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            },
            text: {
                fontSize: RFValue(20),
                textAlign: 'center',
                fontFamily: 'BYekan',
                color: Black
            }
        }
    },
    imagePicker: {
        container: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 20
        },
        image: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: WhiteSmoke,
            borderRadius: 15
        },
        icon: {
            fontSize: RFValue(35)
        },
        ripple: {
            backgroundColor: Blue,
            paddingHorizontal: 15,
            // paddingVertical:2,
            borderRadius: 15
        },
        rippleText: {
            color: White,
            fontFamily: 'BYekan'
        }

    }
})