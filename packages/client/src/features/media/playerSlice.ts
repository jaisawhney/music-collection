import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
    volume: number;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    isMuted: boolean;
}

const initialState: PlayerState = {
    volume: 100,
    duration: 0, // Song duration
    currentTime: 0, // <Audio> element .currentTime
    isPlaying: false,
    isMuted: false,
};

export const playerSlice = createSlice({
    name: 'mediaPlayer',
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setMuted: (state, action) => {
            state.volume = action.payload;
        },
    },
});

export const { setIsPlaying } = playerSlice.actions;

export default playerSlice.reducer;