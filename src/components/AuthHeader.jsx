import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import login_background from '../assets/login_background.jpg';

const AuthHeader = ({headerText, subtitleText}) => {
  return (
    <View style={{backgroundColor: '#FFF'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFF'} />
      <View style={styles.imageContainer}>
        <Image source={login_background} style={styles.imageStyle} />
      </View>
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.subtitleText}>{subtitleText}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  imageContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 100,
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  subtitleText: {
    color: '#C5C5C5',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    // paddingBottom: 60,
  },
});
