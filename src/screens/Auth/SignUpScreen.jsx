import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import AuthHeader from '../../components/AuthHeader';
import CustomInput from '../../components/CustomInput';
import useAuth from '../../context/auth/useAuth';
import RouteText from '../../components/RouteText';
import CustomAuthButton from '../../components/CustomAuthButton';
import GoogleButton from '../../components/GoogleButton';
import OR from '../../components/OR';

const SignUpScreen = () => {
  const {email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleNewUser} = useAuth();
  console.log('pass_is', password)
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
      <View>
        <AuthHeader headerText="Sign Up" subtitleText="Create a new account" />
      </View>
      <View style={{paddingTop: 20}}>
        <CustomInput
          labelText="Email"
          placeholderText="enter email"
          value={email}
          onChangeText={text => setEmail(text)}
          isPassword={false}
        />
        <CustomInput
          labelText="Password"
          placeholderText="enter password"
          onChangeText={text => setPassword(text)}
          value={password}
          isPassword={true}
        />
          <CustomInput
          labelText="confirm password"
          placeholderText="enter password"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          isPassword={true}
        />
        <View>
          <CustomAuthButton  buttonText="Sign up" backColor="#000" handleFunc={handleNewUser} />
          {/*<GoogleButton />*/}
          <OR />
          <GoogleButton />
        </View>
        <RouteText
          textIs="Already have an account?"
          routeText="Log in"
          routeTo="login"
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
