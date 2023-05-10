import { createSlice } from "@reduxjs/toolkit";
import Data from "../api/data.json";

const INITIAL_STATE = {
    data: Data.data
  
};

const formSlice = createSlice({
  name: "form",
  initialState: INITIAL_STATE,
  reducers: {
    
   
    },
    
});

// export const { increment, decrement, addToCart, updateUser } =
//   formSlice.actions;

export default formSlice.reducer;
