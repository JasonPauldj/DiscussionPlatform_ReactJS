import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState : {
        user : null,
        isLoggedIn : false
    },
    reducers : {
        login : (state,action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        update : (state,action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        }
    }
});

export const {login,logout, update} = userSlice.actions;

export default userSlice.reducer;