import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./form";
const store = configureStore({
  reducer: {
    
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
