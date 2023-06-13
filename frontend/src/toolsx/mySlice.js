import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const mySlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotif: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotif: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
   
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
   
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);
      
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
    },
});

export const { addNotif, resetNotif } = mySlice.actions;
export default mySlice.reducer;

