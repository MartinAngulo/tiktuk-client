import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userSlice from './user';
import videosSlice from './videos';
import likesSlice from './likes';

const reducer = combineReducers({
    user: userSlice,
    videos: videosSlice,
    likes: likesSlice
});

const persistConfg = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfg, reducer);


export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);