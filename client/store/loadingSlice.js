import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: true
  };
  
  export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
      setLoading: (state, action) => {
        // console.log('recieved payload: ')
        // console.log(action.payload)
        state.value = action.payload
      }
    },
  });
  
  export const { setLoading } = loadingSlice.actions;
  
  export default loadingSlice.reducer;