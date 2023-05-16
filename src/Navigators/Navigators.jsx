import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCartItemsFromLocal, subTotal} from '../services/cartSlice';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

const VerifiedNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="bell" component={NotificationScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="category" component={CategoryScreen} />
      </Stack.Navigator>
      <BottomBarNavigator />
    </>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="verified" component={VerifiedNavigator} />
      <Stack.Screen name="cart" component={CartScreen} />
      <Stack.Screen name="productDetail" component={ProductDetail} />
    </Stack.Navigator>
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
  const {user, setUser, dispatch} = useAuth();
  const cart = useSelector((state)=> state.cart)

  const checkUserLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      const statusIs = await checkUserLoggedIn();
      setUser(statusIs);
    };
    checkStatus();
  }, []);

  return (
    <>
      {user ? (
        <>
          <MainNavigator />
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

export const BottomBarNavigator = (props) => {
  const [activeTab, setActiveTab] = useState('home');
  const {navigation} = useAuth();
  const cart = useSelector((state)=> state.cart)
  const dispatch = useDispatch()

  useEffect(()=> {
    if(activeTab === 'cart'){
      console.log('inside_this')
      setActiveTab('home')
    }
  }, [activeTab])

  const handleClick = value => {
    setActiveTab(value);
    navigation.navigate(value);
  };

  return (
    <View style={styles.container}>
      {barData.map(item => {
        return (
          <View key={item.id} style={styles.singleContainer}>
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
                <Pressable onPress={() => handleClick(item.name)} style={{position: 'relative'}}>
                    {item.name === 'cart' ? <View style={styles.cartQuantityContainer}>
                      <Text style={styles.cartQunatityLengthText}>{cart.cartTotalQuantity}</Text>
                    </View> : null}
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
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  singleContainer: {
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
  cartQuantityContainer: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#000',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQunatityLengthText: {
    color: 'gold',
    fontFamily: 'Poppins-Regular'
  }
});
