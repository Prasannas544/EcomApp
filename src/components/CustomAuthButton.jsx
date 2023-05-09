import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CustomAuthButton = ({buttonText, backColor}) => {
  return (
    <TouchableOpacity
      style={{...styles.wholeContainer, backgroundColor: backColor}}>
      <Text style={styles.textStyles}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomAuthButton;

const styles = StyleSheet.create({
  wholeContainer: {
    borderRadius: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  textStyles: {
    color: '#FFF',
  },
});
