import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const CustomInput = ({labelText, placeholderText}) => {
  return (
    <View style={styles.wholeContainer}>
      <Text style={styles.labelText}>{labelText}</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder={placeholderText}
        placeholderTextColor="#959595"
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  wholeContainer: {
    paddingBottom: 20,
  },
  labelText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  textInput: {
    width: '100%',
    // height: 20,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    color: '#000',
    paddingVertical: 0,
    fontFamily: 'Poppins-Regular',
  },
});
