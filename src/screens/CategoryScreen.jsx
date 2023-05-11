import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const CategoryScreen = ({}) => {
  return (
    <SafeAreaView style={styles.wholeContainer}>
        <StatusBar animated={true} backgroundColor={'#FFF'} barStyle={'dark-content'} />
        <Header />
        <Text>Screen rte</Text>
    </SafeAreaView>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
    wholeContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingHorizontal: 20
    },
})