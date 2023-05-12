import axios from "axios";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getAllData = createAsyncThunk("data/getAllData", async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getCategoryData = createAsyncThunk('data/getCategoryData', async(cat)=> {
    try{
      const response = await axios.get(`https://fakestoreapi.com/products/category/${cat}`)
      console.log('url_is', `https://fakestoreapi.com/products/category/${cat}`)
      return response.data;
    } catch(err){
      console.log(err)
    }
  })
  
  export const getDetail = createAsyncThunk("detail/getDetail", async (id) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

//const initialState={loading: false, items: null, error: null, details: null}

const dataSlice = createSlice({
    name: 'data',
    initialState: {
      loading: false,
      allItems: null,
      categoryItems: null,
      error: null,
      singleDetails: null
    },
    extraReducers: (builder)=> {
        builder.addCase(getAllData.pending, (state)=> {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(getAllData.fulfilled, (state, action)=> {
          state.loading = false
            state.items = action.payload
            state.error = null
        }),
        builder.addCase(getAllData.rejected, (state, action)=> {
            state.loading=false
            state.error = action.error.message
        }),
        builder.addCase(getCategoryData.pending, (state)=> {
          state.loading = true;
          state.error = null;
      }),
      builder.addCase(getCategoryData.fulfilled, (state, action)=> {
        state.loading = false
          state.categoryItems = action.payload
          state.error = null
      }),
      builder.addCase(getCategoryData.rejected, (state, action)=> {
          state.loading=false
          state.error = action.error.message
      }),
        builder.addCase(getDetail.pending, (state)=> {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(getDetail.fulfilled, (state, action)=> {
            state.details = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(getDetail.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.error.message
        })
    }
  })

  export default dataSlice.reducer