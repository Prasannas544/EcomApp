import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import {CommonActions, useNavigation} from "@react-navigation/native"
import {useDispatch} from 'react-redux'

const Header = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack())
  }

  return (
    <Pressable style={styles.container} onPress={()=> handleGoBack() }>
        <View style={styles.imageContainer}>
      <Image source={require('../assets/back_vector.png')} style={styles.imageStyles} />
      </View>
      <View><Text>Hello</Text></View>
    </Pressable>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        marginBottom: 20
    },
    imageContainer: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 50
    },
    imageStyles: {
    width: 18,
    height: 12
}})