import { createSlice } from '@reduxjs/toolkit';
import { Song } from '../../common/types';

interface QueueState {
    queue: Song[]; // queue[queueIdx] is the current song
    queueIdx: number;
    isLooped: boolean;
}

const initialState: QueueState = {
    queue: [],
    queueIdx: -1,
    isLooped: false,
};

export const queueSlice = createSlice({
    name: 'mediaQueue',
    initialState,
    reducers: {
        setCurrentSong: (state, action) => {
            state.queueIdx = state.queue.findIndex(track => track.id == action.payload.id); // -1 or track index
        },
        addSongToQueue: (state, action) => {
            // Prevent duplicates
            const songIdx = state.queue.findIndex(track => track.id == action.payload.id);

            if (songIdx === -1) {
                // Add if not a duplicate
                state.queue.push(action.payload);
                state.queueIdx = state.queue.length - 1;
            } else {
                // Play if a duplicate
                state.queueIdx = songIdx;
            }
        },
        removeSongFromQueue: (state, action) => {
            const songIdx = state.queue.findIndex(track => track.id == action.payload.id);
            if (songIdx !== -1) {
                // Remove song if it exists
                state.queue.splice(songIdx, 1);
            }
        },
        setQueueIdx: (state, action) => {
            state.queueIdx = action.payload;
        },
        setIsLooped: (state, action) => {
            state.isLooped = action.payload;
        },
    },
});

export const { setCurrentSong, addSongToQueue, setQueueIdx } = queueSlice.actions;

export default queueSlice.reducer;