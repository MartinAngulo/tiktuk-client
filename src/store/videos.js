import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import config from '../config/api';

const initialState = {
    status: 'not_load',
    data: {
        videos: [],
        currentPage: 1,
        prevPage: null,
        nextPage: null,
        total: 1,
    },
    currentVideo: null,
};

export const innerLoadVideos = async(path, thunkAPI) => {
    let token;
    try{
        token = thunkAPI.getState().user.user.jwtToken;
    }catch(err){
        return Promise.reject("Token not found")
    }

    if(!token)return Promise.reject("Error Token");

    const response = await axios.get(`${config.domain}/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const loadVideos = createAsyncThunk('videos/loadVideos', async (page=1, thunkAPI) => {
    return innerLoadVideos(`videos?page=${page}`, thunkAPI);
});

export const loadVideosForUser = createAsyncThunk('videos/loadVideosForUser', async (_, thunkAPI) => {
    return innerLoadVideos(`users/videos`, thunkAPI);
});

export const createVideo = createAsyncThunk('videos/createVideo', async (videoData, thunkAPI) => {
    let token;
    try{
        token = thunkAPI.getState().user.user.jwtToken;
    }catch(err){
        return Promise.reject("Token not found")
    }

    if(!token)return Promise.reject("Error Token");

    const response = await axios.post(`${config.domain}/videos`,videoData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const getVideo = createAsyncThunk('videos/getVideo', async (videoId, thunkAPI) => {
    let token;
    try{
        token = thunkAPI.getState().user.user.jwtToken;
    }catch(err){
        return Promise.reject("Token not found")
    }

    if(!token)return Promise.reject("Error Token");

    const response = await axios.get(`${config.domain}/videos/${videoId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});


const Videos = createSlice({
    name: "videos",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [loadVideos.pending]: (state, action)=>{
            state.status = "loading"
        },
        [loadVideos.fulfilled]: (state, action)=>{
            const {currentPage, nextPage, prevPage, total } = action.payload;
            const videos = [...state.data.videos, ...action.payload.videos];
            state.status = "success";
            state.data = {
                currentPage,
                nextPage,
                prevPage,
                total,
                videos: [...state.data.videos, ...action.payload.videos],
            }
        },
        [getVideo.fulfilled]: (state, action)=>{
            state.status = "success";
            state.currentVideo = action.payload;
        },
        [loadVideosForUser.fulfilled]: (state, action)=>{
            state.status = "success";
            state.data.videos = action.payload;
        },
    }
});

export const { } = Videos.actions;
export default Videos.reducer;