import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../../Utils";

export const fetchCategory = createAsyncThunk("category/fetchCategories", async () => {
    const categories = await fetchCategories();
    return categories;
});


export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: null,
        status : 'idle'
    },
    reducers: {
        addNewCategory: (state, action) => {
            state.categories.push(action.payload)
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchCategory.pending, (state,action)=> {
            state.status = 'loading'
        }).addCase(fetchCategory.fulfilled, (state,action) => {
            state.status='idle';
            state.categories = action.payload;
        })
    }
});

export const {addNewCategory} = categorySlice.actions;

export const addCategory = (category) => (dispatch) => {
      dispatch(addNewCategory(category));
  };

export default categorySlice.reducer;

