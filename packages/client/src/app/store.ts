import { configureStore } from "@reduxjs/toolkit";
import playerReducer from '../features/media/playerSlice';
import queueReducer from '../features/media/queueSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        queue: queueReducer
    },
});