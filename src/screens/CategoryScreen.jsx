import { View, Text, SafeAreaView, StatusBar, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import {useSelector} from 'react-redux'

const CategoryScreen = (props, route) => {
  const {categoryItems} = useSelector((state)=> state.data)

  const SingleContainer=({item})=> {
    return (
      <View style={styles.singleWholeContainer}>
        <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={{width: 120, height: 100}} resizeMode='contain' />
        </View>
    </View>
    )
  }

  console.log('props_are', props)
  return (
    <SafeAreaView style={styles.wholeContainer}>
        <StatusBar animated={true} backgroundColor={'#FFF'} barStyle={'dark-content'} />
        <Header goBack={props.canGoBack} />
        <Text>{'Category name'}</Text>
        <View>
          <FlatList
            data={categoryItems}
            renderItem={({item}) => <SingleContainer item={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            />
        </View>
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
    singleWholeContainer: {
      flex: 1,
      margin: 5,
    },
    imageContainer: {
      borderRadius: 20,
      
    },
    imageStyles: {
      width: 200,
      height: 70
    }
})