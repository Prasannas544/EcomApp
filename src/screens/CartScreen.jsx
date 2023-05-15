import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {BottomBarNavigator} from '../Navigators/Navigators';
import useAuth from '../context/auth/useAuth';
import {useSelector} from 'react-redux';

const CartScreen = () => {
  const {cartItems}  =useSelector((state)=> state.cart)
  console.log('cartItems_are', cartItems)
  return (
    <ScrollView style={styles.wholeContainer}>
      <Text>CartScreen</Text>
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
});
