import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from '../screens/Auth/LogInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const VerifiedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LogInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
