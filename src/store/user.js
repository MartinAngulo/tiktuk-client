import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import config from '../config/api';

const initialState = {
    user: null,
    status: '',
}

export const signUp = createAsyncThunk('user/signUp', async ({ credentials }) => {
    const response = await axios.post(`${config.domain}/users`, {
        user: credentials,
    });
    return response.data.user;
});

export const signIn = createAsyncThunk('user/signIn', async ({ credentials }) => {
    const response = await axios.post(`${config.domain}/users/signin`, {
        user: credentials,
    });
    return response.data.user;
});

const User = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.status = '';
        },
    },
    extraReducers: {
        [signUp.pending]: (state, action) => {
            state.status = "loading";
        },
        [signUp.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = "success";
        },
        [signUp.rejected]: (state, action) => {
            state.status = "failed";
        },
        [signIn.pending]: (state, action) => {
            state.status = "loading";
        },
        [signIn.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = "success";
        },
        [signIn.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
});

export const { logOut } = User.actions;
export default User.reducer;