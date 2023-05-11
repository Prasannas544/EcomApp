import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
      <Image source={require('../assets/back_vector.png')} style={styles.imageStyles} />
      </View>
      <View><Text>Hello</Text></View>
    </View>
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