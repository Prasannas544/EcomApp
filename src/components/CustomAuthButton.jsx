import {View, Text, TouchableOpacity, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import useAuth from '../context/auth/useAuth';

const CustomAuthButton = ({buttonText, backColor, handleFunc}) => {
  const {loading}  = useAuth()
  return (
    <Pressable
      style={{...styles.wholeContainer, backgroundColor: backColor}}
      onPress={()=> handleFunc()}
    >
     {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.textStyles}>{buttonText}</Text> }
    </Pressable>
  );
};

export default CustomAuthButton;

const styles = StyleSheet.create({
  wholeContainer: {
    borderRadius: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  textStyles: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular'
  },
});
