import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect, useRef, useState } from 'react';
import { Song } from '../../common/types';
import { useDispatch } from 'react-redux';
import { setIsPlaying } from '../../features/media/playerSlice';
import { setQueueIdx } from '../../features/media/queueSlice';

export default function MediaPlayer() {
    const dispatch = useDispatch();

    const [currentSong, setCurrentSong] = useState<null | Song>(null);

    const queue = useSelector((state: RootState) => state.queue.queue);
    const queueIdx = useSelector((state: RootState) => state.queue.queueIdx);

    const playerRef = useRef(null);

    // Handle queue updates
    useEffect(() => {
        const player: any = playerRef.current;

        if (queueIdx !== -1) {
            // Play the song in the queue
            const song = queue[queueIdx];
            setCurrentSong(song);

            player.src = `/api/stream/${song.mediaHash}`;
            player.load();
            player.play();
        } else {
            // Stop the audio player
            player.src = '';
            player.pause();
            setCurrentSong(null);
        }
    }, [queue, queueIdx]);

    function handleSongEnd() {
        const nextIdx = queueIdx + 1;

        // Play the next song
        if (nextIdx < queue.length)
            return dispatch(setQueueIdx(nextIdx));

        // End of queue
        dispatch(setQueueIdx(-1));
        dispatch(setIsPlaying(true));
    }

    /*
        TODO: Implement controls
        TODO: Implement progress bar
     */

    return (
        <>
            <audio onEnded={handleSongEnd} id={'audio'} ref={playerRef} />
            <ProgressBar />
            <Controls />
        </>
    );
}