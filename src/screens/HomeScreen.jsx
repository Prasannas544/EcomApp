import {
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import useAuth from '../context/auth/useAuth';
import Feather from 'react-native-vector-icons/Feather';
import SingleCategory from '../components/SingleCategory';
import new_arrials from '../assets/new-arrivals.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const {handleLogout, showBottomBarNavigation, navigation} = useAuth();

  return (
    <ScrollView style={styles.wholeContainer}>
      <StatusBar
        animated={true}
        backgroundColor={'#FFF'}
        barStyle={'dark-content'}
      />
      {/*<Header />*/}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 26}}>
          Welcome!
        </Text>
        <FontAwesome name="user" size={36} color="#000" />
      </View>
      <View style={styles.searchContainer}>
        <Feather name="search" size={26} color="#000" />
        <TextInput
          placeholder="Search items here"
          style={styles.textInputStyle}
          placeholderTextColor={'#ADADAD'}
        />
      </View>
      <SingleCategory
        headerText={'New Arrivals'}
        quantity={'220'}
        image={new_arrials}
        direction="row"
        dataFor="all"
      />
      <SingleCategory
        headerText={'Mens'}
        quantity={'384'}
        image={new_arrials}
        direction="row-reverse"
        dataFor="men's clothing"
      />
      <SingleCategory
        headerText={'Women'}
        quantity={'120'}
        image={new_arrials}
        direction="row"
        dataFor="women's clothing"
      />
      <SingleCategory
        headerText={'electronics'}
        quantity={'69'}
        image={new_arrials}
        direction="row-reverse"
        dataFor="electronics"
      />
      <SingleCategory
        headerText={'jewelery'}
        quantity={'220'}
        image={new_arrials}
        direction="row"
        dataFor="jewelery"
      />
      <Button onPress={() => handleLogout(0)} title="Log out" />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    position: 'relative',
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  textInputStyle: {
    height: '100%',
    width: '100%',
  },
});
