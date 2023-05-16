import {View,Text,ScrollView,StyleSheet,StatusBar,Image,Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {handleItemTitle} from '../components/customFunctions';
import useAuth from '../context/auth/useAuth';
import {decreaseCartQuantity, increaseCartQuantity, removeFromCart, subTotal} from '../services/cartSlice';

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

  useEffect(() => {
    dispatch(subTotal());
  }, [dispatch, cart]);

  console.log('cart_items', cart.cartItems)

  const SignleCartItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <Image source={{uri: item.image}} style={{width: 70,height: 'auto',borderRadius: 30}} />
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
      </View>
    )
  }

  console.log('cart.cartItems_are', cart.cartItems)

  return (
    <ScrollView style={styles.wholeContainer}>
      {/*<SafeAreaView>*/}
      <StatusBar
        animated={true}
        backgroundColor={'#FFFFFF'}
        barStyle={'dark-content'}
      />
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
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    position: 'relative',
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
    borderBottomWidth: 1,
    borderBottomColor: '#BCBCBC'
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
});
