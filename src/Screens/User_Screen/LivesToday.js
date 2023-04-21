import { Alert as ReactAlert, BackHandler, ScrollView, View } from 'react-native'
import React, { useContext, useEffect } from 'react';
import Content_livesToday from '../../Components/User_Component/LivesToday_components/Content_livesToday';
import { Context } from '../../Storage/Context';
import { useIsFocused } from '@react-navigation/native';
import { Alert, Header, Style } from '../../Components/Common';
import moment from 'jalali-moment';

const LivesToday = (props) => {
  const { alertConfig } = useContext(Context)
  const state = useIsFocused();


  return (
    <View style={{ ...Style.screenContainer, backgroundColor: '#F1F1F1' }}>
      <Header />
      <ScrollView>
        <Content_livesToday {...props} />
      </ScrollView>
    </View>
  )
}


export default React.memo(LivesToday)