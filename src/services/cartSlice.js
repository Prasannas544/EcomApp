import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

const initialState = {cartItems: [], cartQuantity: 0, cartTotalAmount: 0};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cart => cart.id === action.payload.id,
      );
      if (itemIndex >= 0) {
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
        const tempProducts = {...action.payload, cartItems: 1};
        state.cartItems.push(tempProducts);
        Toast.show({
          type: 'success',
          text1: 'Added to Cart',
          text2: `${action.payload.title.substring(0, 12)} added to cart`,
          visibilityTime: 3000, // Duration to show the toast in milliseconds (optional)
        });
      }
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
