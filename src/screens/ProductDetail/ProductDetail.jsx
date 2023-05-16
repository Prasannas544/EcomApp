import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useAuth from '../../context/auth/useAuth';
import {getProductDetail, removeDetail} from '../../services/dataSlice';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  addToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  subTotal,
} from '../../services/cartSlice';
import {handleItemTitle} from '../../components/customFunctions';

const ProductDetail = props => {
  const [quantity, setQuantity] = useState(0);
  const {loading, singleItemDetail} = useSelector(state => state.data);
  const {cartItems} = useSelector(state => state.cart);

  const {dispatch, navigation} = useAuth();

  const id = props.route.params.productID;

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(subTotal());
  }, []);

  const handleAddToCart = product => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = cartItem => {
    dispatch(decreaseCartQuantity(cartItem));
  };

  const handleIncreaseCart = cartItem => {
    dispatch(increaseCartQuantity(cartItem));
  };

  const RenderStars = rating => {
    const stars = [];

    // Render full stars
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? 'star' : 'star-o';
      stars.push(
        <FontAwesome
          key={i}
          name={starIcon}
          size={16}
          color="#FFAC08"
          style={{marginRight: 3}}
        />,
      );
    }

    return stars;
  };

  const isAddedAlready = id => {
    let checkStatus = cartItems.some(item => item.id === id);
    if (checkStatus) {
      return true;
    }
    return false;
  };

  return (
    <>
      {singleItemDetail === null ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
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
                {/*<Header goto={()=> navigation.dispatch(CommonActions.goBack())} />*/}
                <Header goto={() => navigation.goBack(null)} />
                {singleItemDetail && (
                  <View style={styles.carouselContainer}>
                    <Image
                      source={{uri: singleItemDetail.image}}
                      style={{width: 250, height: 200, resizeMode: 'center'}}
                    />
                  </View>
                )}
              </View>
              <View style={styles.productDetailContainer}>
                <View style={styles.titleAndQuantityContainer}>
                  <View>
                    <Text style={styles.titleTextStyles}>
                      {handleItemTitle(singleItemDetail.title)}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: '#000',
                      }}>
                      {singleItemDetail.category}
                    </Text>
                    <View style={styles.ratingsContainer}>
                      {RenderStars(4.9)}
                      <Text style={styles.reviewTextStyles}>(260 Reviews)</Text>
                    </View>
                  </View>
                  <View style={styles.quantityContainer}>
                    {/*<Pressable onPress={() => handleDecreaseCart(singleItemDetail)}>
                      <Text style={styles.quantityTextStyles}>-</Text>
                    </Pressable>
                    <Text style={styles.quantityTextStyles}>{quantity}</Text>
                    <Pressable onPress={() => handleIncreaseCart(singleItemDetail)}>
                      <Text style={styles.quantityTextStyles}>+</Text>
                    </Pressable>*/}
                    <Text style={{color: '#000'}}>In stock</Text>
                  </View>
                </View>
                <View style={{marginTop: 40}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      color: '#000',
                      fontSize: 20,
                    }}>
                    Size
                  </Text>
                  <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                    {singleItemDetail.description}
                  </Text>
                </View>
                <View style={{marginTop: 40}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      color: '#000',
                      fontSize: 20,
                    }}>
                    Desctiption
                  </Text>
                  <Text style={{color: '#000', fontFamily: 'Poppins-Regular'}}>
                    {singleItemDetail.description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Text style={styles.priceContainer}>₹{singleItemDetail.price}</Text>
            {isAddedAlready(singleItemDetail.id) ? (
              <View style={styles.addToCart}>
                <Text style={styles.addToCartText}> Already added</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addToCart}
                onPress={() => handleAddToCart(singleItemDetail)}>
                <Feather name="shopping-cart" size={16} color="#000" />
                <Text style={styles.addToCartText}> Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  pageContainer: {
    position: 'relative',
    paddingBottom: 50,
  },
  imageAndHeaderContainer: {
    paddingHorizontal: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
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
  productDetailContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //backgroundColor: '#DDE1E2',
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 20,
  },
  titleTextStyles: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  titleAndQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  quantityContainer: {
    borderRadius: 40,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 14,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  quantityTextStyles: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  reviewTextStyles: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
