import { createSlice } from '@reduxjs/toolkit';

interface PlayerState {
    volume: number;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    isPaused: boolean;
    isMuted: boolean;
}

const initialState: PlayerState = {
    volume: 50,
    duration: 0, // Song duration
    currentTime: 0, // <Audio> element .currentTime
    isPlaying: false,
    isPaused: false,
    isMuted: false,
};

export const playerSlice = createSlice({
    name: 'mediaPlayer',
    initialState,
    reducers: {
        play: (state) => {
            state.isPlaying = true;
            state.isPaused = false;
        },
        pause: (state) => {
            state.isPlaying = false;
            state.isPaused = true;
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

export const { play, pause, setVolume, setMuted } = playerSlice.actions;

export default playerSlice.reducer;