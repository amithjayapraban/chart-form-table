import { createSlice } from "@reduxjs/toolkit";
import Data from "../api/data.json";

const INITIAL_STATE = {
  data: Data.data,
  submited_Data: {
    first_name: "",
    last_name: "",
    age: -1,
    dob: "",
    gender: "",
    email: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState: INITIAL_STATE,
  reducers: {
    setSubmittedData: (state, action) => {
      state.submited_Data = action.payload;
    },
  },
});

export const { setSubmittedData } = formSlice.actions;
export default formSlice.reducer;
