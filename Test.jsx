import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyApp} from './src/Navigators/Navigators';
// import {AuthProvider} from './src/context/auth/useAuth';
import {SecondaryProvider} from './src/context/secondary/useSecondary';
import {Provider} from 'react-redux';
import store from './src/services/store';
import {AuthProvider} from './src/context/auth/useAuth';
import {ThemeProvider} from './src/context/theme/useTheme'
import Toast from 'react-native-toast-message';

const Test = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ThemeProvider>
        <AuthProvider>
          <SecondaryProvider>
            <MyApp />
            <Toast ref={ref => Toast.setRef(ref)} />
          </SecondaryProvider>
        </AuthProvider>
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default Test;
