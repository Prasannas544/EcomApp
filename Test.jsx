import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyApp} from './src/Navigators/Navigators';
import {AuthProvider} from './src/context/auth/useAuth';
import {SecondaryProvider} from './src/context/secondary/useSecondary';
import {Provider} from 'react-redux';
import store from './src/services/store';

const Test = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthProvider>
          <SecondaryProvider>
            <MyApp />
          </SecondaryProvider>
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default Test;
