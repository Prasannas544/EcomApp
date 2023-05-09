import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import AuthHeader from '../../components/AuthHeader';
import CustomInput from '../../components/CustomInput';
import useAuth from '../../context/auth/useAuth';
import CustomAuthButton from '../../components/CustomAuthButton';
import RouteText from '../../components/RouteText';

const LogInScreen = () => {
  const {email, setEmail, password, setPassword} = useAuth();

  console.log('email_is', email);

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
      <View>
        <AuthHeader
          headerText="Welcome!"
          subtitleText="please login or signup to continue our app"
        />
      </View>
      <View style={{paddingTop: 40}}>
        <CustomInput
          labelText="Email"
          inputType="email"
          placeholderText="enter email"
          handleTextChange={e => setEmail(e)}
          // value={email}
          isPassword={false}
        />
        <CustomInput
          labelText="Password"
          inputType="password"
          placeholderText="enter password"
          handleTextChange={e => setPassword(e)}
          value={password}
          isPassword={true}
        />
        <View>
          <CustomAuthButton buttonText="Login" backColor="#000" />
          <CustomAuthButton
            buttonText="Continue with Facebook"
            backColor="#3B5999"
          />
        </View>
        <RouteText
          textIs="Don't have an account?"
          routeText="Sign up"
          routeTo="signup"
        />
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;
