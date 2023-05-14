import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyApp} from './src/Navigators/Navigators';
// import {AuthProvider} from './src/context/auth/useAuth';
import {SecondaryProvider} from './src/context/secondary/useSecondary';
import {Provider} from 'react-redux';
import store from './src/services/store';
import useAuth, {AuthProvider} from './src/context/auth/useAuth';
import Toast from 'react-native-toast-message';

const Test = () => {
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
