import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
    reducer : {
        user: userReducer,
        categories : categoryReducer
    }
});


