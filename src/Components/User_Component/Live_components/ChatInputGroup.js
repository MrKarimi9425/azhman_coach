import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';



const renderContent = () => {
  // const { message } = this.state;
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.textInput}
        placeholder="Comment input"
        underlineColorAndroid="transparent"
        // onChangeText={this.onChangeMessageText}
        // value={message}
        autoCapitalize="none"
        autoCorrect={false}
      // onEndEditing={this.onEndEditing}
      // onFocus={this.onFocus}
      />
      <TouchableOpacity
        style={styles.wrapIconSend}
        // onPress={this.onPressSend}
        activeOpacity={0.6}
      >
        <Image source={require('../../../assets/images/ico_send.png')} style={styles.iconSend} />
      </TouchableOpacity>
    </View>
  );
}

const renderListMessages = () => {
  // const { messages, isVisibleMessages } = this.state;
  // if (!isVisibleMessages) return null;
  return <MessagesList />;
};

const ChatInputGroup = () => {
  return <SafeAreaView style={styles.wrapper}>{renderContent()}</SafeAreaView>;
}

export { ChatInputGroup }

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 15,
  },
  flex1: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  wrapIconHeart: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    zIndex: 2,
  },
  iconHeart: {
    width: 45,
    height: 45,
    zIndex: 2,
  },
  wrapIconSend: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconSend: {
    width: 33,
    height: 33,
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
})