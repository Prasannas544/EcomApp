import {View, Text, Button, StatusBar, TextInput, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import useAuth from '../context/auth/useAuth';
import Header from '../components/Header';
import Feather from 'react-native-vector-icons/Feather'
import SingleCategory from '../components/SingleCategory';
import new_arrials from '../assets/new-arrivals.jpg'
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const {handleLogout} = useAuth()
  const {items} = useSelector((state=> state.data))

  console.log('items', items)
  return (
    <ScrollView style={styles.wholeContainer}>
      <StatusBar animated={true} backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <Header />
      <View style={styles.searchContainer}>
        <Feather name='search' size={26} color='#000' />
        <TextInput placeholder='Search items here' style={styles.textInputStyle} placeholderTextColor={'#ADADAD'} />
      </View>
      <SingleCategory headerText={'New Arrivals'} quantity={'220'} image={new_arrials} direction='row' />
      <SingleCategory headerText={'Mens'} quantity={'384'} image={new_arrials} direction='row-reverse' />
      <SingleCategory headerText={'Women'} quantity={'120'} image={new_arrials} direction='row' />
      <SingleCategory headerText={'Electronics'} quantity={'69'} image={new_arrials} direction='row-reverse' />
      <SingleCategory headerText={'Jewelery'} quantity={'220'} image={new_arrials} direction='row' />
      <Button onPress={()=> handleLogout(0)} title='Log out' />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20
  },
  textInputStyle: {
    height: '100%',
    width: '100%'
  }
})
