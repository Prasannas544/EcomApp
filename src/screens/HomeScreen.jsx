import {View, Text, Button} from 'react-native';
import React from 'react';
import useAuth from '../context/auth/useAuth';

const HomeScreen = () => {
  const {handleLogout} = useAuth()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={()=> handleLogout(0)} title='Log out' />
    </View>
  );
};

export default HomeScreen;
