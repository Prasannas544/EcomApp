import {View,Text,TextInput,StyleSheet, TouchableOpacity} from 'react-native';
import React ,{useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo'

const CustomInput = ({onChangeText,value,labelText,placeholderText,isPassword}) => {
  const [showWhichImage, setShowWhichImage] = useState('eye-with-line')

  const handleImageToggle=()=> {
    if(showWhichImage === 'eye-with-line'){
      setShowWhichImage('eye')
    } else {
      setShowWhichImage('eye-with-line')
    }
  }

  return (
    <View style={styles.wholeContainer}>
      <Text style={styles.labelText}>{labelText}</Text>
      <View style={styles.inputandIcon}>
        <TextInput
          onChangeText={onChangeText}
          //value={value}
          style={styles.textInput}
          keyboardType={isPassword ? 'default' : 'email-address'}
          autoCapitalize="none"
          placeholder={placeholderText}
          placeholderTextColor="#959595"
          secureTextEntry={ showWhichImage === 'eye' ? false : true}
        />
        <View style={{marginRight: 4}}>
          {isPassword ? 
            <TouchableOpacity onPress={handleImageToggle}>
              <Entypo name={showWhichImage} size={18} color='#000' />
            </TouchableOpacity> : null
          }
        </View>
      </View>
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
  inputandIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  textInput: {
    width: '100%',
    height: '100%',
    color: '#000',
    paddingVertical: 0,
    fontFamily: 'Poppins-Regular',
  },
});
