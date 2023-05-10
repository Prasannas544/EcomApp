import {View, Text, TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomAuthButton = ({buttonText, backColor, handleFunc}) => {
  return (
    <Pressable
      style={{...styles.wholeContainer, backgroundColor: backColor}}
      onPress={()=> handleFunc()}
    >
      <Text style={styles.textStyles}>{buttonText}</Text>
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
