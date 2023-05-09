import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator, VerifiedNavigator} from './src/Navigators/Navigators';
import {AuthProvider} from './src/context/auth/useAuth';

const Test = () => {
  const user = false;
  return (
    <NavigationContainer>
      <AuthProvider>
        {user ? (
          <>
            <VerifiedNavigator />
          </>
        ) : (
          <AuthNavigator />
        )}
      </AuthProvider>
    </NavigationContainer>
  );
};

export default Test;
