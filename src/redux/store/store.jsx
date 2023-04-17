import { combineReducers, configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../slices/servicesSlice";
import recordsReducer from "../slices/recordSlice";
import adminReducer from "../slices/adminSlice";
const reducer = combineReducers({
    servicesReducer,
    recordsReducer,
    adminReducer
})
export const store = configureStore({
    reducer
})