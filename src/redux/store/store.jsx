import { combineReducers, configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../slices/servicesSlice";
import recordsReducer from "../slices/recordSlice";

const reducer = combineReducers({
    servicesReducer,
    recordsReducer

})
export const store = configureStore({
    reducer
})