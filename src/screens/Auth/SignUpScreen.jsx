import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import AuthHeader from '../../components/AuthHeader';

const SignUpScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
      <View>
        <AuthHeader headerText="Sign Up" subtitleText="Create a new account" />
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
