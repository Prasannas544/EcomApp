import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {BottomBarNavigator} from '../Navigators/Navigators';
import useAuth from '../context/auth/useAuth';

const CartScreen = () => {
  const {showBottomBarNavigation} = useAuth();
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
