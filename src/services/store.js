import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import dataSlice from './dataSlice';
import cartSlice, {fetchCartItemsFromLocalStorage} from './cartSlice';

const store = configureStore({
  reducer: {data: dataSlice, cart: cartSlice},
  //middleware: getDefaultMiddleware((middlewareConfig) => {
  //  middlewareConfig.serializableCheck.ignoredActions = [
  //    ...middlewareConfig.serializableCheck.ignoredActions,
  //    fetchCartItemsFromLocalStorage.type,
  //  ];
  //}),
});

store.dispatch(fetchCartItemsFromLocalStorage());

export default store;
