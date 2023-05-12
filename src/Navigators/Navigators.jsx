import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from '../screens/Auth/LogInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import useAuth from '../context/auth/useAuth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductDetail from '../screens/ProductDetail/ProductDetail';
import useSecondary from '../context/secondary/useSecondary';

const Stack = createStackNavigator();

const VerifiedNavigator = () => {
  return (
    <>
      <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
          <Stack.Screen name="bell" component={NotificationScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="category" component={CategoryScreen} />
          <Stack.Screen name="productDetail" component={ProductDetail} />
        </Stack.Navigator>
        {/* <BottomBarNavigator /> */}
      </>
    </>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LogInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export const MyApp = () => {
  const {user} = useAuth();
  return (
    <>
      {user ? (
        <>
          <VerifiedNavigator />
        </>
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

const barData = [
  {id: 1, name: 'home', icon: 'home'},
  {id: 2, name: 'cart', icon: 'shopping-cart'},
  {id: 3, name: 'bell', icon: 'bell'},
  {id: 4, name: 'profile', icon: 'user'},
];

export const BottomBarNavigator = () => {
  const [activeTab, setActiveTab] = useState('home');

  const {navigation} = useSecondary();

  const handleClick = value => {
    setActiveTab(value);
    navigation.navigate(value);
  };
  return (
    <View style={styles.container}>
      {barData.map(item => {
        return (
          <View key={item.id} style={styles.signleContainer}>
            {item.name == activeTab ? (
              <View style={styles.activeTabContainer}>
                <View
                  style={[
                    styles.activeIconContainer,
                    item.name === 'profile' ? {paddingHorizontal: 7} : null,
                  ]}>
                  <FontAwesome name={item.icon} size={18} color="#FFF" />
                </View>
                <Text style={styles.activeText}>{item.name}</Text>
              </View>
            ) : (
              <Pressable onPress={() => handleClick(item.name)}>
                <FontAwesome name={item.icon} size={24} color="#000" />
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  signleContainer: {
    width: '25%',
    maxwidth: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 40,
    paddingVertical: 0,
    paddingRight: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeIconContainer: {
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 7,
  },
  activeText: {
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontWeight: 700,
  },
});
