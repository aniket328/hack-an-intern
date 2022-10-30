import { configureStore } from "@reduxjs/toolkit"
import appDataReducer from "./appDataSlice"
import loadingReducer from "./loadingSlice"
import currentPageReducer from "./appDataSlice"

export const store = configureStore({
  reducer: {
    appData: appDataReducer,
    loading: loadingReducer,
    // currentPage: currentPageReducer
  },
})