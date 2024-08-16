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
        },
        signOut : (state,action)=>{
            state.isLoggedIn = false;
            state.name = null;
            state.secretKey = null;
            state.userId = null
        }

    }
});
export const {saveUser, signOut} = slice.actions;
export default slice.reducer;