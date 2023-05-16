import {View,Text,ScrollView,StyleSheet,StatusBar,Image,Pressable, Button} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {handleItemTitle} from '../components/customFunctions';
import useAuth from '../context/auth/useAuth';
import {clearCart, decreaseCartQuantity, increaseCartQuantity, removeFromCart, subTotal} from '../services/cartSlice';

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

  const SignleCartItem = ({item}) => {
    return (
      <View style={styles.container}>
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
      </View>
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
      <Pressable style={styles.PTCButton}>
        <Text style={{fontFamily: 'Poppins-Bold', color: '#FFF', textAlign: 'center', letterSpacing: 2}}>Proceed to Checkout</Text>
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
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    padding: 20
  }, 
  PTCButton: {
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 12,
  }
});
