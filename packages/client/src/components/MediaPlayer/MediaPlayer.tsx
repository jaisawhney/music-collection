import { Song } from '../../common/types';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useRef } from 'react';

import { RootState } from '../../app/store';
import { setCurrentTime, setDuration, setIsPlaying } from '../../features/media/playerSlice';
import { setQueueIdx } from '../../features/media/queueSlice';

import CurrentTrack from './CurrentTrack';
import Controls from './Controls';
import SeekBar from './SeekBar';

// TODO: Style

export default function MediaPlayer() {
    const dispatch = useDispatch();

    const isPlaying: boolean = useSelector((state: RootState) => state.player.isPlaying);
    const duration: number = useSelector((state: RootState) => state.player.duration);
    const currentTime: number = useSelector((state: RootState) => state.player.currentTime);

    const queue: Song[] = useSelector((state: RootState) => state.queue.queue);
    const queueIdx: number = useSelector((state: RootState) => state.queue.queueIdx);

    const currentSong: Song = queue[queueIdx];

    const audioRef = useRef<HTMLAudioElement>(null);

    // On queue updates
    useEffect(() => {
        if (!audioRef.current) return;

        if (queueIdx !== -1) {
            // Get the current song in the queue
            const song = queue[queueIdx];

            // Start the stream
            audioRef.current.src = `/api/stream/${song.mediaHash}`;
            audioRef.current.load();
            audioRef.current.play();
            dispatch(setDuration(song.duration));
        }
    }, [queueIdx]);

    function onPlay() {
        dispatch(setIsPlaying(true));
    }

    function onPause() {
        dispatch(setIsPlaying(false));
    }

    function onTimeUpdate(e: ChangeEvent<HTMLAudioElement>) {
        dispatch(setCurrentTime(e.target.currentTime));
    }

    function handleSongEnd() {
        const nextIdx = queueIdx + 1;

        // Play the next song
        if (nextIdx < queue.length)
            return dispatch(setQueueIdx(nextIdx));

        // End of queue
        dispatch(setIsPlaying(false));
    }

    return (
        <div className={'py-2 px-5 w-full h-[75px] sticky bottom-0 flex justify-between items-center bg-white border'}>
            <audio
                id={'audio'}
                ref={audioRef}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={handleSongEnd}
                onTimeUpdate={onTimeUpdate}
            />

            <CurrentTrack currentSong={currentSong} />

            <SeekBar
                duration={duration}
                currentTime={currentTime}
                audioRef={audioRef}
            />

            <Controls
                isPlaying={isPlaying}
                queue={queue}
                queueIdx={queueIdx}
                audioRef={audioRef}
            />
        </div>
    );
}