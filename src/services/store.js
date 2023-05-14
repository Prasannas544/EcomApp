import {configureStore} from '@reduxjs/toolkit';

import dataSlice from './dataSlice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {data: dataSlice, cart: cartSlice},
});

export default store;
