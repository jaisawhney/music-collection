import { createSlice } from '@reduxjs/toolkit';
import { Song } from '../../common/types';

interface QueueState {
    queue: Song[];
    queueIdx: number;
    isLooped: boolean;
    isShuffled: boolean;
}

const initialState: QueueState = {
    queue: [], // queue[queueIdx] is the current song
    queueIdx: -1,
    isLooped: false,
    isShuffled: false,
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
            } else {
                // Play if a duplicate
                state.queueIdx = songIdx;
            }
        },
        removeSongFromQueue: (state, action) => {
            const songIdx = state.queue.findIndex(track => track.id == action.payload.id);
            if (songIdx !== -1) {
                state.queue.splice(songIdx, 1);

                if (songIdx <= state.queueIdx) {
                    // Removed song was before the current index
                    state.queueIdx -= 1;
                } else if (songIdx === state.queue.length) {
                    // Removed song was the last in the queue
                    state.queueIdx = state.queue.length - 1;
                }
            }
        },
        clearQueue: (state) => {
            state.queue = [];
            state.queueIdx = -1;
        },
        setQueueIdx: (state, action) => {
            state.queueIdx = action.payload;
        },
        setIsLooped: (state, action) => {
            state.isLooped = action.payload;
        },
    },
});

export const {
    setCurrentSong,
    addSongToQueue,
    removeSongFromQueue,
    clearQueue,
    setQueueIdx,
    setIsLooped,
} = queueSlice.actions;

export default queueSlice.reducer;