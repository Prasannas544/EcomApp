import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

//const initialState = {
//  cartItems: AsyncStorage.getItem('cartItems') ?
//    JSON.parse(AsyncStorage.getItem('cartItems'))
//      :
//    [],
//    cartTotalQuantity: 0,
//    cartTotalAmount: 0
//  };


const initialState = {
  cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => {
      const itemIndex = state.cartItems.findIndex(
        cart => cart.id === action.payload.id,
      );
      if(itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        Toast.show({
          type: 'success',
          text1: 'Added to Cart',
          text2: `increased ${action.payload.title.substring(
            0,
            12,
          )} quantity to ${state.cartItems[itemIndex].cartQuantity}`,
          visibilityTime: 3000, // Duration to show the toast in milliseconds (optional)
        });
      } else {
        const tempProducts = {...action.payload,cartItems: 1};
        state.cartItems.push(tempProducts);
        Toast.show({
          type: 'success',
          text1: 'Added to Cart',
          text2: `${action.payload.title.substring(0,12)} added to cart`,
          visibilityTime: 3000, // Duration to show the toast in milliseconds (optional)
        });
      }
      AsyncStorage.setItem('cartItems',JSON.stringify(state.cartItems));
    },
    removeFromCart: (state,action) => {
      const newCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      AsyncStorage.setItem("cartItems",JSON.stringify(state.cartItems));
      Toast.show({
        type: 'error',
        text1: 'Removed From Cart',
        text2: `${action.payload.title.substring(0,12)} removed from cart`,
        visibilityTime: 3000, // Duration to show the toast in milliseconds (optional)
        autoHide: true
      });
    },
    decreaseCartQuantity: (state,action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if(state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if(state.cartItems[itemIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = newCartItem;
      }
      AsyncStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    increaseCartQuantity: (state,action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      state.cartItems[itemIndex].cartQuantity += 1;
      AsyncStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    clearCart: (state,action) => {
      state.cartItems = [];
      AsyncStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    subTotal: (state) => {
      let {total,quantity} = state.cartItems.reduce(
        (cartTotal,cartItem) => {
          const {price,cartQuantity} = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  subTotal
} = cartSlice.actions;
export default cartSlice.reducer;

// Fetch local data and update cartItems in the initial state
export const fetchCartItemsFromLocalStorage = () => async (dispatch) => {
  try {
    const cartItemsData = await AsyncStorage.getItem('cartItems');
    if (cartItemsData) {
      const parsedCartItems = JSON.parse(cartItemsData);
      dispatch(setCartItems(parsedCartItems));
    }
  } catch (error) {
    console.log('Error fetching cart items:', error);
  }
};

// Set cart items action
export const setCartItems = (cartItems) => {
  return {
    type: 'cart/setCartItems',
    payload: cartItems,
  };
};

// Override the reducer to handle the setCartItems action
cartSlice.reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'cart/setCartItems':
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
