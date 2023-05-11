import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { MyApp} from './src/Navigators/Navigators';
import {AuthProvider} from './src/context/auth/useAuth';
import {Provider} from 'react-redux';
import store from './src/services/store';

const Test = () => {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <AuthProvider>
        <MyApp />
      </AuthProvider>
    </NavigationContainer>
    </Provider>
  );
};

export default Test;
