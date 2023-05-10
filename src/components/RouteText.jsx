import {Text, Pressable} from 'react-native';
import React from 'react';
import useAuth from '../context/auth/useAuth';

const RouteText = ({textIs, routeText, routeTo}) => {
  const {navigation} = useAuth();

  const handleRoute = () => {
    navigation.navigate(routeTo);
  };
  return (
    <Pressable
      onPress={handleRoute}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
      }}>
      <Text style={{fontFamily: 'Poppins-Regular', color: '#000'}}>
        {textIs}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: '#000',
          textDecorationLine: 'underline',
        }}>
        {routeText}
      </Text>
    </Pressable>
  );
};

export default RouteText;
