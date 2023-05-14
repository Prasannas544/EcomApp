import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyApp} from './src/Navigators/Navigators';
// import {AuthProvider} from './src/context/auth/useAuth';
import {SecondaryProvider} from './src/context/secondary/useSecondary';
import {Provider} from 'react-redux';
import store from './src/services/store';
import {AuthProvider} from './src/context/auth/useAuth';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = () => {
  const checkUserLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      return userToken !== null;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthProvider>
          <SecondaryProvider>
            <MyApp />
            <Toast ref={ref => Toast.setRef(ref)} />
          </SecondaryProvider>
        </AuthProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default Test;
