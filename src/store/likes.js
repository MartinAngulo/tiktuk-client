import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import config from '../config/api';

const initialState = {
    data: {},
    status: 'not_load',
}

export const likeVideo = createAsyncThunk('likes/likeVideo', async (videoId, thunkAPI) => {
    let token;
    try {
        token = thunkAPI.getState().user.user.jwtToken;
    } catch (err) {
        return Promise.reject("Token not found")
    }

    if (!token) return Promise.reject("Error Token");

    const response = await axios.post(`${config.domain}/likes`,
        {
            like: {
                videoId: videoId
            }
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return response.data;
});

const Likes = createSlice({
    name: "likes",
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [likeVideo.fulfilled]:(state, action)=>{
            state.status = 'success';
            state.data = action.payload;
        },

    }
});

export const { } = Likes.actions;
export default Likes.reducer;