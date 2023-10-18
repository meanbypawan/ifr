import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "user",
    initialState:{
        secretKey: null,
        name: null,
        isLoggedIn: false,
        userId: null
    },
    reducers:{
        saveUser: (state,action)=>{
            state.secretKey = action.payload.secretKey;
            state.name = action.payload.name;
            state.isLoggedIn = true;
            state.userId = action.payload.userId
        }
    }
});
export const {saveUser} = slice.actions;
export default slice.reducer;