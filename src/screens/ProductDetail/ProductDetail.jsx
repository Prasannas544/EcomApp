import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import useAuth from '../../context/auth/useAuth';
import {getProductDetail} from '../../services/dataSlice';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

const ProductDetail = props => {
  const {loading, singleItemDetail} = useSelector(state => state.data);

  const {dispatch} = useAuth();

  let id = props.route.params.productID;

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  const handleAddToCart = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is a success toast',
      visibilityTime: 2000, // Duration to show the toast in milliseconds (optional)
    });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
            <StatusBar
              animated={true}
              backgroundColor={'#FFFFFF'}
              barStyle={'dark-content'}
            />
            <View style={styles.pageContainer}>
              <View style={styles.imageAndHeaderContainer}>
                <Header />
                {singleItemDetail && (
                  <View style={styles.carouselContainer}>
                    <Image
                      source={{uri: singleItemDetail.image}}
                      style={{width: 250, height: 150, resizeMode: 'contain'}}
                    />
                    <Text style={{color: '#000'}}>
                      {singleItemDetail.title}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Text style={styles.priceContainer}>₹{singleItemDetail.price}</Text>
            <Pressable
              style={styles.addToCart}
              onPress={() => handleAddToCart()}>
              <Feather name="shopping-cart" size={16} color="#000" />
              <Text style={styles.addToCartText}> Add to Cart</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  pageContainer: {
    position: 'relative',
  },
  imageAndHeaderContainer: {
    paddingHorizontal: 10,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTextStyle: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
  },
  addToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  addToCartText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  priceContainer: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});
