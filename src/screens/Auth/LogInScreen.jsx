import {View,Text,SafeAreaView,StatusBar} from 'react-native';
import React from 'react';
import AuthHeader from '../../components/AuthHeader';
import CustomInput from '../../components/CustomInput';
import useAuth from '../../context/auth/useAuth';
import CustomAuthButton from '../../components/CustomAuthButton';
import RouteText from '../../components/RouteText';
import GoogleButton from '../../components/GoogleButton';
import OR from '../../components/OR';

const LogInScreen = () => {
  const {email,setEmail,password,setPassword,handleLogin} = useAuth();

  return (
    <SafeAreaView
      style={{flex: 1,paddingHorizontal: 20,backgroundColor: '#FFF'}}>
      <View>
        <AuthHeader
          headerText="Welcome!"
          subtitleText="please login or signup to continue our app"
        />
      </View>
      <View style={{paddingTop: 40}}>
        <CustomInput
          labelText="Email"
          placeholderText="enter email"
          onChangeText={text => setEmail(text)}
          value={email}
          isPassword={false}
        />
        <CustomInput
          labelText="Password"
          placeholderText="enter password"
          onChangeText={text => setPassword(text)}
          value={password}
          isPassword={true}
        />
        <View>
          <CustomAuthButton buttonText="Login" backColor="#000" handleFunc={handleLogin} />
          <OR />
          <GoogleButton />
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
