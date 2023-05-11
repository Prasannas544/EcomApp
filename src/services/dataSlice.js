import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getAllData = createAsyncThunk("data/getAllData", async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      console.log('response_is', response)
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });
  
  export const getDetail = createAsyncThunk("detail/getDetail", async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  });

  const initialState={loading: false, items: {}, error: null, details: {}}

const dataSlice = createSlice({
    name: 'slice',
    initialState,
    extraReducers: (builder)=> {
        builder.addCase(getAllData.pending, (state)=> {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(getAllData.fulfilled, (state)=> {
          console.log('this_one')
            state.items = action.payload
            state.loading = false
            state.error = null
        }),
        builder.addCase(getAllData.rejected, async()=> {
            state.loading=false
            state.error = action.error.message
        }),
        builder.addCase(getDetail.pending, async()=> {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(getDetail.fulfilled, async()=> {
            state.details = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(getDetail.rejected, async()=> {
            state.loading = false;
            state.error = action.error.message
        })
    }
  })

  export default dataSlice.reducer