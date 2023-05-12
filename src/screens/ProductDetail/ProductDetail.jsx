import { View, Text, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Image, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import useAuth from '../../context/auth/useAuth'
import {getProductDetail} from '../../services/dataSlice'
import Header from '../../components/Header'
import Carousel from 'react-native-reanimated-carousel';
import CustomCarousel from '../../components/CustomCarousel'

const jsonDATA = [{id: 1, name: "A"}, {id: 2, name: "B"}, {id: 3, name: "C"}]

const ProductDetail = (props) => {
  const {loading, singleItemDetail} = useSelector((state)=> state.data)

  const {dispatch}  = useAuth()

  let id = props.route.params.productID
  const width = Dimensions.get('window').width;
  //let image = singleItemDetail.image || '';

  useEffect(()=> {
     dispatch(getProductDetail(id))
  }, [])

  return (
    <>
    {loading ?
      <ActivityIndicator size="large" color="#000" /> 
      :
      <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
        <StatusBar animated={true} backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
        <View style={styles.imageAndHeaderContainer}>
        <Header />
        <View style={styles.carouselContainer}>
          <Image source={{uri: singleItemDetail.image}} style={{width: 250, height: 150, resizeMode: 'contain'}} /> 
          {singleItemDetail && <Text>{singleItemDetail.title}</Text>}
        </View>
        </View>
        </ScrollView>
    }
    </>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  wholeContainer: {
  flex: 1, backgroundColor: '#FFF'
},
imageAndHeaderContainer: {
  paddingHorizontal: 10
},
carouselContainer: {
  alignItems: 'center',
  justifyContent: 'center'
}
})