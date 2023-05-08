import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LogInScreen from './src/screens/Auth/LogInScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';

const Stack = createStackNavigator();

const App: JSX.Element = () => {
  const user = true;
  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
        {/* {user ? (
          <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="login" component={LogInScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
          </Stack.Navigator>
        )} */}
        <Text>chal gaya BC</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
