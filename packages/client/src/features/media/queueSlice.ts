import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.queueIdx = state.queue.findIndex(track => track.id == action.payload.id); // -1 or track index
        },
        addSongToQueue: (state, action: PayloadAction<Song>) => {
            // Prevent duplicates
            const songIdx = state.queue.findIndex(track => track.id == action.payload.id);

            if (songIdx === -1) {
                // Add if not a duplicate
                state.queue.push(action.payload);
            }
        },
        removeSongFromQueue: (state, action: PayloadAction<Song>) => {
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
        setQueueIdx: (state, action: PayloadAction<number>) => {
            state.queueIdx = action.payload;
        },
        setIsLooped: (state, action: PayloadAction<boolean>) => {
            state.isLooped = action.payload;
        },
        setQueueItems: (state, action: PayloadAction<Song[]>) => {
            state.queue = action.payload;
            state.queueIdx = -1;
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
    setQueueItems,
} = queueSlice.actions;

export default queueSlice.reducer;