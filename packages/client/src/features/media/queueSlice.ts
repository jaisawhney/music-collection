import { createSlice } from '@reduxjs/toolkit';

interface Song {
    id: number;
    mediaPath: string;
    mediaHash: string;
    duration: number;
    track?: number;
}

interface QueueState {
    queue: Song[]; // queue[queueIdx] is the current song
    queueIdx: null | number;
    isLooped: boolean;
}

const initialState: QueueState = {
    queue: [],
    queueIdx: null,
    isLooped: false,
};

export const queueSlice = createSlice({
    name: 'mediaQueue',
    initialState,
    reducers: {
        add: (state, action) => {
            state.queue.push(action.payload);
        },
        remove: (state, action) => {
            state.queue.splice(action.payload, 1);
            if (!state.queue.length) state.queueIdx = null;
        },
        setIdx: (state, action) => {
            state.queueIdx = action.payload;
        },
        setIsLooped: (state, action) => {
            state.isLooped = action.payload;
        },
    },
});

export const { add, remove, setIdx, setIsLooped } = queueSlice.actions;

export default queueSlice.reducer;