import { Song } from '../../../common/types';
import { clsx } from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useRef } from 'react';

import { RootState } from '../../../app/store';
import { setCurrentTime, setDuration, setIsPlaying } from '../../../features/media/playerSlice';
import { setQueueIdx } from '../../../features/media/queueSlice';

import CurrentTrack from './CurrentTrack';
import Controls from './Controls';
import SeekBar from './SeekBar';
import SecondaryControls from './SecondaryControls';

export default function MediaPlayer() {
    const dispatch = useDispatch();

    const isPlaying: boolean = useSelector((state: RootState) => state.player.isPlaying);
    const duration: number = useSelector((state: RootState) => state.player.duration);
    const currentTime: number = useSelector((state: RootState) => state.player.currentTime);
    const volume: number = useSelector((state: RootState) => state.player.volume);

    const queue: Song[] = useSelector((state: RootState) => state.queue.queue);
    const queueIdx: number = useSelector((state: RootState) => state.queue.queueIdx);

    const currentSong: Song = queue[queueIdx];

    const audioRef = useRef<HTMLAudioElement>(null);

    // On queue updates
    useEffect(() => {
        if (!audioRef.current) return;

        if (queueIdx >= 0 && currentSong) {
            // Start the stream
            audioRef.current.src = `/api/stream/${currentSong.mediaHash}`;
            audioRef.current.load();
            audioRef.current.play();
            dispatch(setDuration(currentSong.duration));
        }
    }, [queueIdx, currentSong]);

    // On pause/resume
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // On volume change
    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume / 100;
    }, [volume]);

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

    // TODO: Fix mobile layout
    return (
        <div className={clsx(
            'py-2 px-5 w-full h-[75px] sticky bottom-0 flex justify-between items-center bg-white border',
            'sm:px-10',
        )}>
            <audio
                id={'audio'}
                ref={audioRef}
                onPlay={() => dispatch(setIsPlaying(true))}
                onPause={() => dispatch(setIsPlaying(false))}
                onEnded={handleSongEnd}
                onTimeUpdate={onTimeUpdate}
            />

            <CurrentTrack currentSong={currentSong} />

            <div className={'flex flex-col items-center w-full max-w-[500px]'}>
                <Controls
                    isPlaying={isPlaying}
                    queue={queue}
                    queueIdx={queueIdx}
                />

                <SeekBar
                    duration={duration}
                    currentTime={currentTime}
                    audioRef={audioRef}
                />
            </div>

            <SecondaryControls volume={volume} />
        </div>
    );
}