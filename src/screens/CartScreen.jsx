import {View,Text,ScrollView,StyleSheet,StatusBar,Image,Pressable, Button, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {handleItemTitle} from '../components/customFunctions';
import useAuth from '../context/auth/useAuth';
import {clearCart, decreaseCartQuantity, increaseCartQuantity, removeFromCart, subTotal} from '../services/cartSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CartScreen = () => {
  const cart = useSelector((state) => state.cart)
  const {navigation, dispatch} = useAuth()

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCartQuantity(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(increaseCartQuantity(cartItem));
  };

  const handleClearCart=()=> {
    dispatch(clearCart())
  }

  useEffect(() => {
    dispatch(subTotal());
  }, [dispatch, cart]);

  const slideAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const SignleCartItem = ({item}) => {
    //const slideAnim = useRef(new Animated.Value(0)).current
    //const opacityAnim = useRef(new Animated.Value(0)).current;

    //useEffect(() => {
    //  Animated.parallel([
    //    Animated.timing(slideAnim, {
    //      toValue: 1,
    //      duration: 500,
    //      useNativeDriver: true,
    //    }),
    //    Animated.timing(opacityAnim, {
    //      toValue: 1,
    //      duration: 500,
    //      useNativeDriver: true,
    //    }),
    //  ]).start();
    //}, []);

    return (
      <Animated.View style={{...styles.container,
        transform: [
        {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0],
          }),
        },
      ],
      
      }}>
        <View style={styles.leftSide}>
          <Image source={{uri: item.image}} style={{width: 70,height: 'auto', objectFit: 'contain'}} />
          <View style={styles.titleAndPriceText}>
            <View>
              <Text style={{fontFamily: 'Poppins-Bold',color: '#000',marginBottom: -5,fontSize: 18}}>{handleItemTitle(item.title)}</Text>
              <Text style={{fontFamily: 'Poppins-Regular',color: '#BCBCBC'}}>{handleItemTitle(item.category)}</Text>
            </View>
            <View>
              <Text style={{fontFamily: 'Poppins-Bold',color: '#000',fontSize: 18}}>₹{item.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <Pressable onPress={()=> handleDecreaseCart(item) }>
            <Text style={styles.quantityTextStyles}>-</Text>
          </Pressable>
          <Text style={styles.quantityTextStyles}>{item.cartQuantity}</Text>
          <Pressable onPress={()=> handleIncreaseCart(item)}>
            <Text style={styles.quantityTextStyles}>+</Text>
          </Pressable>
        </View>
      </Animated.View>
    )
  }

  return (
    <View style={{flex: 1, position: 'relative'}}>
    <ScrollView style={styles.wholeContainer}>
      {/*<SafeAreaView>*/}
      <StatusBar
        animated={true}
        backgroundColor={'#FFFFFF'}
        barStyle={'dark-content'}
      />
      <View style={{position: 'relative', flex: 1}}>
      <Header goto={() => navigation.navigate('home')} />
      {cart.cartItems &&
        <View style={styles.contentContainer}>
          <Text style={styles.myCartText}>My Cart</Text>
          <View>
            {cart.cartItems.map((item) => {
              return (
                <SignleCartItem item={item} key={item.id} />
              )
            })}
          </View>
        </View>
      }
      {/*</SafeAreaView>*/}
      <Button title='clear cart' onPress={()=> handleClearCart()} />
      </View>
    </ScrollView>
    <View style={styles.PTCContianer}>
        {/*<Text style={styles.priceContainer}>Total({3} items) : ₹212</Text>*/}
        <Text style={styles.priceContainer}>Total: ₹{cart.cartTotalAmount}</Text>
      <Pressable style={styles.PTCButton}>
        <MaterialCommunityIcons name='cart-arrow-right' size={16} color="#000" />
        <Text style={{fontFamily: 'Poppins-Bold', color: '#000', textAlign: 'center'}}>Checkout now</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  wholeContainer: {
    //flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  contentContainer: {},
  myCartText: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: 20,
    marginBottom: 40
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    //borderBottomColor: '#BCBCBC'
    borderBottomColor: '#dbdbdb'
  },
  leftSide: {
    flexDirection: 'row',
    gap: 8
  },
  titleAndPriceText: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 7
  },
  quantityContainer: {
    borderRadius: 40,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 14,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  quantityTextStyles: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 16
  },
  PTCContianer: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    paddingHorizontal: 20
  }, 
  PTCButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  priceContainer: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});
