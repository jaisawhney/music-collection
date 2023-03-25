import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    volume: number;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    isMuted: boolean;
}

const initialState: PlayerState = {
    volume: 50,
    duration: 0, // Song duration
    currentTime: 0, // <Audio> element .currentTime
    isPlaying: false,
    isMuted: false,
};

export const playerSlice = createSlice({
    name: 'mediaPlayer',
    initialState,
    reducers: {
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setMuted: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
    },
});

export const { setIsPlaying, setDuration, setCurrentTime, setVolume, setMuted } = playerSlice.actions;

export default playerSlice.reducer;