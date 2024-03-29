import { ActivityIndicator, Alert, Dimensions, Image, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../Storage/Context';
import { getStore } from '../../Storage/Async';
import { isSet, useFetch } from '../../Components/Common'
import { Black, Main } from '../../Components/InitialValue/Colors';
import { useNetInfo } from "@react-native-community/netinfo";
import { RFValue } from 'react-native-responsive-fontsize';

const Splash = () => {
  const { navigate, replace } = useNavigation()
  const { SET_KEY, version, setCheckVersion } = useContext(Context);
  const netinfo = useNetInfo();
  const { data, doFetch } = useFetch('guest/config', false, 'POST', {
    typeVersion: 'versionAppUser',
    keySql: 'versionAppUser'
  })

  const login = () => {
    getStore('@auth_key').then((value) => {
      if (!value.isLogin)
        replace('guest', { screen: 'Login' })
      else {
        SET_KEY(value.auth_key)
        replace('user', { screen: 'LivesToday' })
      }
    })
  }

  const didUpdate = () => {
    if (netinfo.isConnected) {
      if (isSet(data["data"])) {
        setCheckVersion(data["data"]["appVersion"], data["data"]["urlPro"])
        if (data["data"]["appVersion"] != version) {
          if (data["data"]["content"] == 'freeUpdate') {
            Alert.alert('نسخه قدیمی',
              data["data"]["title"], [
              {
                text: 'بروزرسانی',
                onPress: () => {
                  Linking.openURL(data["data"]["urlPro"])
                }
              },
              {
                text: 'ادامه',
                onPress: () => {
                  login();
                }
              }
            ])
          } else {
            Alert.alert('نسخه قدیمی',
              data["data"]["title"], [
              {
                text: 'بروزرسانی',
                onPress: () => {
                  Linking.openURL(data["data"]["urlPro"])
                }
              },
              {
                text: 'خروج',
                onPress: () => BackHandler.exitApp()
              }
            ])
          }
        } else {
          login();
        }
      } else {
        doFetch({
          typeVersion: 'versionAppUser',
          keySql: 'versionAppUser'
        })
      }
    }
  }

  // useEffect(() => {
  //   didUpdate();
  // }, [netinfo.isConnected])

  useEffect(() => {
    didUpdate()
  }, [data])


  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode={'contain'} source={require('../../assets/images/logo.png')} />
      {
        netinfo.isConnected ?
          <ActivityIndicator color={Main} size={'large'} /> :
          <Text style={{ fontSize: RFValue(15), fontFamily: 'BYekan', color: Black }}>اتصال به اینترنت خود را بررسی کنید</Text>
      }
      <Text>{version}</Text>
    </View>
  )

}

export default React.memo(Splash)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('window').width - 50
  }
})