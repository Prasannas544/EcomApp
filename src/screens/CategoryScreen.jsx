import {View,Text,SafeAreaView,StatusBar,StyleSheet,FlatList,Image, ScrollView} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import {useSelector} from 'react-redux'
import {} from 'react-native-gesture-handler'

const CategoryScreen = (props,route) => {
  const {categoryItems} = useSelector((state) => state.data)

  const handleItemTitle = (str) => {

    let result = ''
    let spaceCount = 0
    for(let i = 0; i < str.length; i++) {
      if(str[i] === ' ') {
        spaceCount++
        if(spaceCount === 2) {
          break;
        }
      }
      result += str[i]
    }
    return result
  }

  const SingleContainer = ({item}) => {
    return (
      <View style={styles.singleWholeContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={{width: 120,height: 100}} resizeMode='contain' />
        </View>
        <View>
          <Text style={styles.titlText}>{handleItemTitle(item.title)}</Text>
          <Text style={styles.categoryStyle}>{item.category}</Text>
          <Text style={[styles.titlText, {fontSize: 18}]}>₹{item.price}</Text>
        </View>
      </View>
    )
  }

  console.log('categoryItems',categoryItems)
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
    <SafeAreaView style={styles.wholeContainer}>
      <StatusBar animated={true} backgroundColor={'#E5E5E5'} barStyle={'dark-content'} />
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
    </ScrollView>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    //backgroundColor: '#E5E5E5',
    paddingHorizontal: 20
  },
  singleWholeContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  imageContainer: {
    borderRadius: 20,
  },
  titlText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000',
    marginTop: 2,
    textAlign: 'center'
  },
  categoryStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#969696',
    fontSize: 12,
    textAlign: 'center'
  },
  imageStyles: {
    width: 200,
    height: 70
  }
})