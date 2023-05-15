import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getAllData = createAsyncThunk('data/getAllData', async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const getCategoryData = createAsyncThunk(
  'data/getCategoryData',
  async cat => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${cat}`,
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const getProductDetail = createAsyncThunk(
  'detail/getProductDetail',
  async id => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`,
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    loading: false,
    allItems: null,
    categoryItems: null,
    error: null,
    singleItemDetail: null,
  },
  reducers: {
    removeDetail: (state)=> {
      state.singleItemDetail = null
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllData.pending, state => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload;
        state.error = null;
      }),
      builder.addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
      builder.addCase(getCategoryData.pending, state => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(getCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryItems = action.payload;
        state.error = null;
      }),
      builder.addCase(getCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
      builder.addCase(getProductDetail.pending, state => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.singleItemDetail = action.payload;
        state.error = null;
      });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {removeDetail} = dataSlice.actions
export default dataSlice.reducer;
