import { configureStore } from "@reduxjs/toolkit";
import mySlice from "./toolsx/mySlice";
import appApi from "./services/appApi";


import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";


const myReducer = combineReducers({
    user: mySlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfiguration = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath],
};



const persistedReducer = persistReducer(persistConfiguration, myReducer);



const mystore = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default mystore;