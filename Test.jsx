import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { MyApp} from './src/Navigators/Navigators';
import {AuthProvider} from './src/context/auth/useAuth';

const Test = () => {

  return (
    <NavigationContainer>
      <AuthProvider>
        <MyApp />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default Test;
